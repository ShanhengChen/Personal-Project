const path = require('path');
const fs = require('fs');

const baseUrl = 'http://localhost:3000/static';
const bookFilePath = path.join(__dirname, './static/AI_Russell_Norvig.pdf');
const getBookUrl = () => { 
    const copiedFileName = `${Date.now()}.pdf`;
    const copiedFilePath = path.join(__dirname, `./static/${copiedFileName}`);
    // copy file
    fs.copyFileSync(bookFilePath, copiedFilePath);
    // set time out for copied link
    setTimeout(() => {
        fs.unlinkSync(copiedFilePath);
    }, 100000);
    return `${baseUrl}/${copiedFileName}`;
} 
module.exports = {
    getBookUrl,
}