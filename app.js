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
function Human(name, heightFeet, heightInches, weight, diet) {
  this.name = name;
  this.heightFeet = heightFeet;
  this.heightInches = heightInches;
  this.weight = weight;
  this.diet = diet;
  this.image = 'images/human.png';
}

// Use IIFE to get human data from form
// No IIFE used here.
const getUserData = function () {
  const form = document.forms['dino-compare'];
  const name = form.elements.name.value;
  const inches = form.elements.inches.value;
  const feet = form.elements.feet.value;
  const weight = form.elements.weight.value;
  const myDiet = form.elements.diet.options[diet.selectedIndex].text;

  return new Human(name, feet, inches, weight, myDiet);
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compare1 = () => {
  const human = getUserData();
  hideForm();
  createTiles(dinos, human);
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
// Add tiles to DOM
const createTiles = (dinos, human) => {
  const grid = document.getElementById('grid');
  dinos.forEach((element, index) => {
    console.log(element);
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    if (index === 4) {
      grid.appendChild(createTileContent(human, gridItem));
      return;
    }

    grid.appendChild(createTileContent(element, gridItem));
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

const createTileContent = (element, gridItem) => {
  for (property in element) {
    if (property !== 'image') {
      gridItem.appendChild(
        document.createTextNode(
          `${property.charAt(0).toUpperCase() + property.slice(1)}: ${
            element[property]
          }`
        )
      );
    } else {
      const img = document.createElement('img');
      img.src = element[property];
      gridItem.prepend(img);
    }
    gridItem.appendChild(document.createElement('br'));
  }

  return gridItem;
};
