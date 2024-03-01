const path = require('path');
const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'apiKey.json'
});

app.use(express.json());
app.use('/view', express.static(path.join(__dirname, 'view')));

app.post('/processImage', async (req, res) => {
  try {
    const imageDataUrl = req.body.canvasDataUrl;
    if (!imageDataUrl) {
      throw new Error('Missing canvasDataUrl in the request body');
    }

    const imageBuffer = Buffer.from(imageDataUrl.split('base64,')[1], 'base64');

    // Use the received image data for label detection
    const [result] = await client.objectLocalization(imageBuffer);
    const objects = result.localizedObjectAnnotations;

    // Get the labels of the detected objects
    const objectLabels = objects.map(object => object.name);

    // Send the object labels back to the client
    res.json(objectLabels);
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/canvashandler.js', (req, res) => {
  res.type('text/javascript');
  res.sendFile(path.join(__dirname, 'view', 'canvashandler.js'));
});

app.get('/view/format.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(__dirname, 'view', 'format.css'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, _ => {
  console.log(`Server running on http://localhost:${port}`);
});