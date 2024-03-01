const maxWidth = 800;
const minWidth = 200;
const maxHeight = 600;
const minHeight = 100;

const windowWidth = window.innerWidth - 300;
const windowHeight = window.innerHeight - 200;
let canvasWidth = Math.min(maxWidth, Math.max(minWidth, windowWidth));
let canvasHeight = Math.min(maxHeight, Math.max(minHeight, windowHeight));

const drawingHistory = [];
//define canvas
const myCanvas = new fabric.Canvas("demoCanvas", {
  width: canvasWidth,
  height: canvasHeight,
  backgroundColor: "white",
  isDrawingMode: true,
  eraserMode: false,
  selection: false,
  selectable: false,
});


//define drawing line
const darkGray = "#404040"; 
myCanvas.freeDrawingBrush.color = darkGray;
myCanvas.freeDrawingBrush.width = 2;
myCanvas.globalCompositeOperation = "source-over";
myCanvas.contextContainer.strokeStyle = darkGray;
//listen is visitor draw anything
myCanvas.on('path:created', function(options) {
  drawingHistory.push(myCanvas.toJSON());
});
//undo function
const undo = async () => {
  if (drawingHistory.length > 1) {
    drawingHistory.pop();
    try {
      await myCanvas.loadFromJSON(drawingHistory[drawingHistory.length - 1]);
      myCanvas.renderAll();
    } catch (error) {
      console.error('Error during loadFromJSON:', error);
    }
  } else if (drawingHistory.length === 1) {
    drawingHistory.pop();
    cleanCanvas();
  }
};
// erase drawing function 
const toggleEraser = () => {
    myCanvas.eraserMode = !myCanvas.eraserMode;

    if (myCanvas.eraserMode) {
        myCanvas.freeDrawingBrush.color = "white";  
        myCanvas.freeDrawingBrush.width = 20; 
        myCanvas.globalCompositeOperation = "destination-out";  
        myCanvas.contextContainer.strokeStyle = "white";
    } 
};
// enable drawing function
const toggleDraw = () => {
    myCanvas.selection = false;
    myCanvas.set({ isDrawingMode: !myCanvas.get("isDrawingMode") });
    myCanvas.selection = false; // Always set selection to false
    myCanvas.freeDrawingBrush.color = darkGray;
    myCanvas.freeDrawingBrush.width = 2;
    myCanvas.globalCompositeOperation = "source-over";
    myCanvas.contextContainer.strokeStyle = darkGray;
};


const cleanCanvas = () => {
  drawingHistory.push(myCanvas.toJSON());
  myCanvas.clear();
  myCanvas.setBackgroundColor("white", myCanvas.renderAll.bind(myCanvas));
};

const saveAndSendToGoogleCloudVision = async () => {
  try {
    const canvasDataUrl = myCanvas.toDataURL('image/jpeg');

    // Send the data to the server
    const response = await fetch('/processImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canvasDataUrl }), 
    });

    const result = await response.json();
    updateObjectLabels(result);
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateObjectLabels = (labels) => {
  const labelList = document.getElementById('labelList');
  const existingLabels = new Set();
  labelList.innerHTML = '';
  labels.forEach(label => {
    if (!existingLabels.has(label)) {
      const listItem = document.createElement('li');
      listItem.textContent = label;
      labelList.appendChild(listItem);
      existingLabels.add(label);
    }
  });
};



const buttons = document.querySelectorAll('.sidenav button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('ac'));
    this.classList.add('ac');
  });
});
