import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import styles from './styles.module.scss';
import {LeftOutlined} from "@ant-design/icons";
import bookImage from './assets/book.png';

const baseUrl = 'http://localhost:3000';
const axiosInstance = axios.create({
  baseURL: baseUrl, 
});

function App() {
  const [clientId, setClientId] = useState('');
  const [clientToken, setClientToken] = useState('');

  useEffect(() => {
    const getClientToken = async () => {
      const response = await axiosInstance.get('/client_token');
      console.log(response.data.clientId);
      console.log(response.data.clientToken);
      setClientId(response.data.clientId);
      setClientToken(response.data.client_token);
    };
    getClientToken();
  }, []); 

  const createOrder = async() => {
    const response = await axiosInstance.post('create_order');
    console.log(response.data.orderID);
    return response.data;
  }

  const onApprove = async (data) => {
    try {
      const response = await axiosInstance.post(`capture_order/${data.orderID}`);
      
      // eslint-disable-next-line no-unused-vars
      const { orderData, bookUrl } = response.data;
      
      if (bookUrl) {
        window.open(bookUrl, '_blank');
      } else {
        alert("Payment fail");
      }
      
      if (response.data?.purchase_units[0]?.payments?.captures[0]?.status === 'COMPLETED') {
        alert("Payment success");
      }
    } catch (error) {
      console.error('Error capturing order:', error);
    }
  };
  
  const onError = (err) => {
    console.error('Payment error:', err);
    alert("Payment failed due to an error");
  }; 

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        {/*header*/}
        <div className={styles.book}>
          <header className={styles.header}>
            <LeftOutlined className={styles.icon} />
          </header>
  
          <img className={styles.bookImage} src={bookImage} alt="Book"/>
  
          <p className={styles.bookTitle}>Artificial Intelligence: A Modern Approach, 4th US ed</p>
  
          <p className={styles.author}> by Stuart Russell and Peter Norvig</p>

        </div>
  
        {/*describe*/}
        <div className={styles.desc}>
          <div className={styles.descHeader}>
            <span className={styles.descTitle}>Book description</span>
            <span className={styles.price}>USD $1.00</span>
          </div>
  
          <p className={styles.descText}>
          Artificial Intelligence: A Modern Approach, 4th offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence. Number one in its field, this textbook is ideal for one or two-semester, undergraduate or graduate-level courses in Artificial Intelligence.
          </p>
        </div>
  
        {/* Tag */}
        <div className={styles.tagList}>
          <span className={styles.yellow}>AI</span>
          <span className={styles.red}>Machine Learning</span>
          <span className={styles.blue}>CSC</span>
        </div>
      </div>
  
      <div className={styles}>
        {
          clientId && clientToken ? (
            <PayPalScriptProvider options={{ clientId: clientId }}>
              <PayPalButtons 
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{ layout: "vertical" }} />
            </PayPalScriptProvider>
          ) : <span> Loading ... </span>
        }
      </div>
    </div>
  );
  
}

export default App;