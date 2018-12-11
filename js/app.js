'use strict';

Image.imgElement1 = document.getElementById('product-pic1');
Image.imgElement2 = document.getElementById('product-pic2');
Image.imgElement3 = document.getElementById('product-pic3');

Image.allImages = [];
var previousDisplayedImages = [];
var selectionCounter = 0;  // User gets 25 selections.

// Constructor function to create an image instance
function Image(name, filePath, description) {
  this.imageName = name;
  this.filePath = filePath;
  this.altText = description;
  this.numberOfTimesClicked = 0;
  this.numberOfTimesDisplayed = 0;
  Image.allImages.push(this);
  this.imageDisplayed = function() {
    this.numberOfTimesDisplayed++;
  };
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

Image.prototype.imageClicked = function() {
  this.numberOfTimesClicked++;
  selectionCounter++;

  alert('Incremented selectionCounter: ' + selectionCounter);

  // Clear previousDisplayedImages array.
  previousDisplayedImages = [];

  // Push images just displayed onto previousDislayedImages array.
  previousDisplayedImages.push(Image.imgElement1);
  previousDisplayedImages.push(Image.imgElement2);
  previousDisplayedImages.push(Image.imgElement3);

  //Image.renderImages();
};

// Randomly generate a number
Image.randomNum = function() {
  var random = Math.random() * Image.allImages.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

// Retrieves three images that are not duplicate with any images displayed 
// immediately before.
Image.getImageNotPreviouslyDisplayed = function() {
  var randomIndex = Image.randomNum();
  var randomImage = Image.allImages[randomIndex];

  if(previousDisplayedImages.length > 0) {
    //Check that image1 is not in previously displayed images array.
    for(var i = 0; i < previousDisplayedImages.length; i++) {
      if(randomImage.filePath === previousDisplayedImages[i].filePath) {
        randomIndex = Image.randomNum();
        randomImage = Image.allImages[randomIndex];
        i = 0; // Start over at the beginning of array
      }
    } 
  } 

  return randomImage;
};

// Display three unique images
Image.renderImages = function() {
  // Retrieves three images that are not duplicate with any images displayed 
  // immediately before.
  var randomImage1 = Image.getImageNotPreviouslyDisplayed();
  var randomImage2 = Image.getImageNotPreviouslyDisplayed();
  var randomImage3 = Image.getImageNotPreviouslyDisplayed();

  // Now check for duplicates.
  var done = false;
  while(! done) {
    if(randomImage1 === randomImage2) {
      randomImage1 = Image.getImageNotPrevioslyDisplayed();
    } else if(randomImage2 === randomImage3) {
      randomImage3 = Image.getImageNotPrevioslyDisplayed();
    } else if(randomImage1 === randomImage3) {
      randomImage3 = Image.getImageNotPrevioslyDisplayed();
    } else {
      done = true;
    }
  }

  Image.imgElement1.alt = randomImage1.altText;
  Image.imgElement1.src = randomImage1.filePath;

  Image.imgElement2.alt = randomImage2.altText;
  Image.imgElement2.src = randomImage2.filePath;

  Image.imgElement3.alt = randomImage3.altText;
  Image.imgElement3.src = randomImage3.filePath;

  randomImage1.numberOfTimesDisplayed++;
  randomImage2.numberOfTimesDisplayed++;
  randomImage3.numberOfTimesDisplayed++;

  console.log('Just rendedred images.');
};

//Image.renderImages();

// if(previousDisplayedImages.length == 0) {
//   previousDisplayedImages.push(Image.imgElement1);
//   previousDisplayedImages.push(Image.imgElement2);
//   previousDisplayedImages.push(Image.imgElement3);
// }

// if(selectionCounter == 25) {
//   Image.imgElement1.removeEventListener('click', Image.imageClicked);
//   Image.imgElement2.removeEventListener('click', Image.imageClicked);
//   Image.imgElement3.removeEventListener('click', Image.imageClicked);
// }

// Test to see why event listener not working.
var randomIndex = Image.randomNum();
var randomImage = Image.allImages[randomIndex];
var myImage1 = Image.allImages[randomIndex];

randomIndex = Image.randomNum();
randomImage = Image.allImages[randomIndex];
var myImage2 = Image.allImages[randomIndex];

randomIndex = Image.randomNum();
randomImage = Image.allImages[randomIndex];
var myImage3 = Image.allImages[randomIndex];

Image.imgElement1.alt = myImage1.altText;
Image.imgElement1.src = myImage1.filePath;

Image.imgElement2.alt = myImage2.altText;
Image.imgElement2.src = myImage2.filePath;

Image.imgElement3.alt = myImage3.altText;
Image.imgElement3.src = myImage3.filePath;

// end of test

Image.imgElement1.addEventListener('click', Image.imageClicked);
Image.imgElement2.addEventListener('click', Image.imageClicked);
Image.imgElement3.addEventListener('click', Image.imageClicked);

//Do calculations
