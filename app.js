// Grab Dinos from JSON file
const getDinoData = async () => {
  const fetchedData = await fetch('./dino.json');
  const data = await fetchedData.json();
  return data.Dinos;
};

// Parse given dinos json array.
// Return a new custom dinos array containing Dino objects.
const parseDinosToArray = (dinosJSON) => {
  if (dinosJSON) {
    const dinoArray = [];
    dinosJSON.forEach((element) => {
      dinoArray.push(
        new Dino(
          element.species,
          element.weight,
          element.height,
          element.diet,
          element.where,
          element.when,
          element.fact
        )
      );
    });
    return dinoArray;
  }
  return null;
};

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = 'images/' + species.toLowerCase() + '.png';
}

// Create Dino Objects
const dinos = [];

// Create Human Object
function human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = 'images/human.png';
}

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compare1 = () => {
  hideForm();
  createTiles(dinos);
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
// Add tiles to DOM
const createTiles = (dinos) => {
  dinos.forEach((element) => {
    console.log(element);
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    for (property in element) {
      if (property !== 'image') {
        gridItem.appendChild(
          document.createTextNode(
            `${property.charAt(0).toUpperCase() + property.slice(1)}: ${
              element[property]
            }\n`
          )
        );
        gridItem.appendChild(document.createElement('br'));
      }
    }
    const grid = document.getElementById('grid');
    grid.appendChild(gridItem);
  });
};

// Remove form from screen
const hideForm = () => {
  const test = document.querySelector('#dino-compare');
  test.style.display = test.style.display != 'none' ? 'none' : 'block';
};

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', compare1);

// Init dino data.
window.onload = async () => {
  await getDinoData().then((result) => {
    parseDinosToArray(result).forEach((element) => {
      dinos.push(element);
    });
  });
};
