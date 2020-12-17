/**
 * @description Grab Dinos from JSON file
 * @returns {Array} Array of Dinos
 */
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
// Use IIFE to get human data from form
// No IIFE used here.
const getUserData = function () {
  const form = document.forms['dino-compare'];
  const name = form.elements.name.value;
  const inches = form.elements.inches.value;
  const feet = form.elements.feet.value;
  const weight = form.elements.weight.value;
  const myDiet = form.elements.diet.options[diet.selectedIndex].text;

  const human = new Dino(name, weight, feet, myDiet);
  human.feet = feet;
  human.inches = inches;
  human.image = 'images/human.png';

  return human;
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareWeight = (dino, human) => {
  hideForm();

  if (dino.species === 'Pigeon') {
    createTiles(dinos, human);
    return;
  }

  if (dino.weight > human.weight * 100) {
    dino.fact = 'You are like a feather compared this dino, little guy!';
  } else if (dino.weight < human.weight * 100) {
    dino.fact = 'The dinos diet is much more better then yours.';
  } else if (dino.weight - 100 < human.weight) {
    dino.fact = 'Maybe you are related. You eat the same stuff.';
  }

  createTiles(dinos, human);
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareHeight = (dino, human) => {
  hideForm();

  if (dino.species === 'Pigeon') {
    createTiles(dinos, human);
    return;
  }

  if (dino.height > human.height * 100) {
    dino.fact = 'Too small. You should get a ladder to feet this big guy.';
  } else if (dino.height < human.height * 100) {
    dino.fact = 'Uuups...be carefull not to stump onto this cute dino.';
  } else if (dino.height - 100 < human.height) {
    dino.fact = "Awesome...you can look into dino's eyes";
  }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = (evt, dino, human) => {
  hideForm();

  if (dino.species === 'Pigeon') {
    createTiles(dinos, human);
    return;
  }

  if (dino.diet === human.diet) {
    dino.fact =
      'You eat the same stuff. Be carefull next time when you go eat outside.';
  } else if (dino.diet !== human.diet) {
    dino.fact =
      'Ok, you do not share your eat, so go out, this dino will not care.';
  } else if (dino.diet === 'carnivor') {
    dino.fact = 'Be carefull, this dino might eat you.';
  }
};

// Generate Tiles for each Dino in Array
// Add tiles to DOM
const createTiles = (dinos, human) => {
  const grid = document.getElementById('grid');

  dinos.forEach((element, index) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    // tile 4 must be the human tile, we check of index 4
    if (index === 4) {
      // human tile
      const header = document.createElement('h3');
      header.innerText = human.species;
      gridItem.appendChild(header);

      const img = document.createElement('img');
      img.src = human.image;
      gridItem.appendChild(img);
    } else {
      // create dino tile
      const header = document.createElement('h3');
      header.innerText = element.species;
      gridItem.appendChild(header);

      const img = document.createElement('img');
      img.src = element.image;
      gridItem.appendChild(img);

      const p = document.createElement('p');
      p.innerText = element.fact;
      gridItem.appendChild(p);
    }

    grid.appendChild(gridItem);
  });
};

// Remove form from screen
const hideForm = () => {
  const test = document.querySelector('#dino-compare');
  test.style.display = test.style.display != 'none' ? 'none' : 'block';
};

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', function () {
  compareWeight(dinos[0], getUserData());
});

// Init dino data.
window.onload = async () => {
  await getDinoData().then((result) => {
    parseDinosToArray(result).forEach((element) => {
      dinos.push(element);
    });
  });
};
