'use strict';

Image.sectionEl = document.getElementById('image-section');
Image.imgElement1 = document.getElementById('product-pic1');
Image.imgElement2 = document.getElementById('product-pic2');
Image.imgElement3 = document.getElementById('product-pic3');


// Image.imgDisplay = document.getElementById('')

// Define the array this way so it takes less memory.  It is associated with the Image 
// constructor function.
Image.allImages = []; 

Image.previousDisplayedImages = [];

Image.imagesToRender = [];

Image.totalClicks = 0;  // User gets 25 selections.

// Constructor function to create an image instance
function Image(name, filePath, description) {
  this.imageName = name;
  this.filePath = filePath;
  this.altText = description;
  this.numberOfTimesClicked = 0;
  this.numberOfTimesDisplayed = 0;
  Image.allImages.push(this);

}

// Create three image instances
new Image('bag', '../img/bag.jpg', 'An r2-d2 roller bag.');
new Image('banana', '../img/banana.jpg', 'A banana slicer.');
new Image('bathroom', '../img/bathroom.jpg', 'A toilet paper holder.');
new Image('boots', '../img/boots.jpg', 'Yellow rain boots.');
new Image('breakfast', '../img/breakfast.jpg', 'Breakfast oven.');
new Image('bubblegum', '../img/bubblegum.jpg', 'Meatball bubblegum.');
new Image('chair', '../img/chair.jpg', 'Red chair.');
new Image('cthulhu', '../img/cthulhu.jpg', 'Alien man.');
new Image('dogDuck', '../img/dog-duck.jpg', 'Dog duck mask.');
new Image('dragon', '../img/dragon.jpg', 'Dragon meat.');
new Image('pen', '../img/pen.jpg', 'Utensil pens.');
new Image('pet-sweep', '../img/pet-sweep.jpg', 'Pet dust boots.');
// new Image('README', '../img/README.md', 'Read me.');
new Image('scissors', '../img/scissors.jpg', 'Pizza scissors.');
new Image('shark', '../img/shark.jpg', 'Shark sleeping bag.');
new Image('sweep', '../img/sweep.png', 'Baby sweeper sleeper.');
new Image('tauntaun', '../img/tauntaun.jpg', 'Cool sleeping bag.');
new Image('unicorn', '../img/unicorn.jpg', 'Unicorn meat.');
new Image('usb', '../img/usb.gif', 'USB lizard tail.');
new Image('water-can', '../img/water-can.jpg', 'Curved watering can.');
new Image('wine-glass', '../img/wine-glass.jpg', 'Side way wine glass.');

// Call back function to handle when click event is triggered.
Image.handleClick = function(event) {
  // console.log('inside handleClick');
  Image.totalClicks++;

  // Increment the number of times image was clicked.
  for(var i = 0; i < Image.allImages.length; i++) {
    if(event.target.alt === Image.allImages[i].alt) {
      Image.allImages[i].numberOfTimesClicked++;
      break;
    }
  }
  
  // alert('Incremented selectionCounter: ' + Image.totalClicks);
  // console.log('Incremented total clicks: ' + Image.totalClicks);

  // Copy images just displayed to previously displayed images array
  for (i = 0; i < Image.imagesToRender.length; i++) {
    Image.previousDisplayedImages.push(Image.imagesToRender[i]);
  }

  // Clear imagesToRender array.
  Image.imagesToRender = [];

  // Get another set of three images.
  Image.renderImages();
};

// Randomly generate a number between 1 and the length of the allImages array.
Image.randomNum = function() {
  var random = Math.random() * Image.allImages.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Image.generateImagesToRender = function() {
  // Image.previousDisplayedImages = Image.imagesToRender;
  var randomIndex = Image.randomNum();
  var randomImage = Image.allImages[randomIndex];

  while(Image.imagesToRender.length < 3) {
    if(! Image.imagesToRender.includes(randomImage)) {
      if(! Image.previousDisplayedImages.includes(randomImage)) {
      //if(randomImage.filePath === Image.previousDisplayedImages[i].filePath) {
        Image.imagesToRender.push(randomImage);
      }
    }
    // } else {
    // Found a duplicate.  Get another random image.
    randomIndex = Image.randomNum();
    randomImage = Image.allImages[randomIndex];
    // }
  } 
};

// Display three unique images
Image.renderImages = function() {
  // Retrieves three images that are not duplicate with any images displayed 
  // immediately before.
  Image.generateImagesToRender();
  
  Image.imgElement1.alt = Image.imagesToRender[0].altText;
  Image.imgElement1.src = Image.imagesToRender[0].filePath;

  Image.imgElement2.alt = Image.imagesToRender[1].altText;
  Image.imgElement2.src = Image.imagesToRender[1].filePath;

  Image.imgElement3.alt = Image.imagesToRender[2].altText;
  Image.imgElement3.src = Image.imagesToRender[2].filePath;

  // Increment counter that tracks number of times displayed
  Image.imagesToRender[0].numberOfTimesDisplayed++;
  Image.imagesToRender[1].numberOfTimesDisplayed++;
  Image.imagesToRender[2].numberOfTimesDisplayed++;

  console.log('Just rendered images.');
};

Image.renderImages();

if(Image.totalClicks === 25) {
  Image.imgElement1.removeEventListener('click', Image.handleClick);
  Image.imgElement2.removeEventListener('click', Image.handleClick);
  Image.imgElement3.removeEventListener('click', Image.handleClick);
}

Image.imgElement1.addEventListener('click', Image.handleClick);
Image.imgElement2.addEventListener('click', Image.handleClick);
Image.imgElement3.addEventListener('click', Image.handleClick);

//Do calculations
