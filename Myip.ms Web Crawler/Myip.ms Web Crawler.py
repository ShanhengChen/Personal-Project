from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException, NoSuchElementException
import random
import time
import pandas as pd
import ddddocr


def handle_captcha():
    while True:
        try:
            # Check if there is a verification code image
            captcha_img = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//img[starts-with(@src, "/captcha.php?jpeg=")]'))
            )
            ocr = ddddocr.DdddOcr(beta=True)
            with open("captcha_img", "wb") as f:
                image = f.read()
            res = ocr.classification(image)
            
            # Check if there is an input box for  entering the verification code
            if driver.find_elements(By.XPATH, '//input[@id="captcha_input"]'):
                captcha_input = res   
                
                # Submitting the verification code here, 
                # such as entering the verification code
                # Assume here that there is an input box, 
                # and you can enter the verification code in the corresponding way.
                driver.find_element(By.XPATH, '//input[@id="captcha_input"]').send_keys(captcha_input)            
                
                # Execute the clicking the submit button here
                driver.find_element(By.XPATH, '//*[@id="captcha_submit"]').click()
                
            else:
                # If there is no input box for manually entering the verification code, 
                # it means clicking the "I am not a robot" mode.
                # Clicking the "I am not a robot" button here
                driver.find_element(By.XPATH, '//button[@id="not_a_robot"]').click()

            return True
        
        except TimeoutException:
            # If the timeout, wait and click "I am not a robot" button
            driver.implicitly_wait(10)
            driver.find_element(By.XPATH,'//*[@id="captcha_submit"]').click() 
            return True

        except NoSuchElementException:
            # If no verification code related elements are found, 
            # it means that the verification code processing has been completed
            return True

        except Exception as e:
            # something unexpected happened
            print(f"something wrong with handling verification code: {str(e)}")
            return False

url = 'https://myip.ms/browse/sites/1/own/376714'
driver = webdriver.Chrome()
driver.get(url)
data = {'Web Name': [], 'Wbe Link': []}
xx = 0

while True:
    # limited the program for short demo
    if xx == 30: 
        break
    
    try:
        # Get the link information of the current page
        page_links = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, '//td[@class="row_name"]/a'))
        )
    except (StaleElementReferenceException, TimeoutException):
        # Handle verification code if element is outdated or times out
        if not handle_captcha():
            # If it returns False, it means not to continue executing the main loop and exit the loop.
            break
        continue
    for link in page_links:
        try:
            href = link.get_attribute('href')            
            # Add link information to dictionary
            data['Web Name'].append(link.text)
            data['Wbe Link'].append(href)
            
        except StaleElementReferenceException:
            # If the element is out of date, re-fetch the element and continue with the next iteration
            continue


    # Find the currently selected page number
    current_page = driver.find_element(By.XPATH, '//a[@class="aqPagingSel"]')
    
    # Find next page button
    try:
        next_page = current_page.find_element(By.XPATH, 'following-sibling::a[1]')
    except NoSuchElementException:
        # If there is no next page button, it means you have reached the last page and exit the loop.
        break

    # wait for 3-10s before you flip to the next page
    time.sleep(random.randint(3, 10))
    xx +=1 
    # click next page
    next_page.click()

df = pd.DataFrame(data)
df.to_excel('output.xlsx', index=False)
driver.quit()

