/**
 * @description Compare weight.
 * @param {Dino} dino
 * @param {Dino} human
 */
const compareWeight = (dino, human) => {
  if (dino.species === 'Pigeon') {
    return;
  }

  if (dino.weight > human.weight * 100) {
    dino.fact = 'You are like a feather compared this dino, little guy!';
  } else if (dino.weight < human.weight * 100) {
    dino.fact = 'The dinos diet is much more better then yours.';
  } else if (dino.weight - 100 < human.weight) {
    dino.fact = 'Maybe you are related. You eat the same stuff.';
  }
};

/**
 * @description Compare height.
 * @param {Dino} dino
 * @param {Dino} human
 */
const compareHeight = (dino, human) => {
  if (dino.species === 'Pigeon') {
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

/**
 * @description Compare diet.
 * @param {Dino} dino
 * @param {Dino} human
 */
const compareDiet = (dino, human) => {
  if (dino.species === 'Pigeon') {
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

/**
 * @description Grab Dinos from JSON file.
 * @returns {Array} Array of Dinos.
 */
const getDinoData = async () => {
  const fetchedData = await fetch('./dino.json');
  const data = await fetchedData.json();
  return data.Dinos;
};

/**
 * @description Parse a json string into an array.
 * @param {string} JSON - dinosJSON
 * @returns {Dinos} Array or null
 */
const parseDinosToArray = (dinosJSON) => {
  if (dinosJSON) {
    const dinoArray = [];
    dinosJSON.forEach((element) => {
      dinoArray.push(
        new Dino(
          element.species,
          parseInt(element.weight),
          parseInt(element.height),
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

/**
 * @description Dinos
 * @constructor
 * @param {string} species - The title of the book
 * @param {int} weight - The author of the book
 * @param {int} height - The author of the book
 * @param {string} diet - The author of the book
 * @param {string} where - The author of the book
 * @param {string} when - The author of the book
 * @param {string} fact - The author of the book
 */
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

/**
 * @description Dinos factory function.
 * @method addDino Add a dino to array.
 * @method shuffle Shuffles the dino array.
 * @method getDinos Retuurn all dinos.
 */
const DinosFactory = () => {
  const dinos = [];
  const compareMethods = [compareWeight, compareDiet, compareHeight];

  return {
    addDino: function (dino) {
      dinos.push(dino);
    },
    shuffle: function shuffle() {
      for (let i = dinos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dinos[i], dinos[j]] = [dinos[j], dinos[i]];
      }
      return dinos;
    },
    getDinos: function () {
      return dinos;
    },
    getCompareMethod: function (number) {
      return compareMethods[number];
    },
  };
};

/**
 * @description Creates a dino object from DinosFactory.
 */
const dinosFactory = DinosFactory();

/**
 * @description Get human data from forms.
 * @returns human object using Dino constructor.
 */
const getHumanData = () => {
  const form = document.forms['dino-compare'];
  const name = form.elements.name.value;
  const inches = parseInt(form.elements.inches.value);
  const feet = parseInt(form.elements.feet.value);
  const weight = parseInt(form.elements.weight.value);
  const myDiet = form.elements.diet.options[
    diet.selectedIndex
  ].text.toLowerCase();

  const human = new Dino(name, weight, feet, myDiet);
  human.feet = feet;
  human.inches = inches;
  human.image = 'images/human.png';

  return human;
};

/**
 * @description Business logic for hole app.
 * @param {DinosFactory} dinos
 */
const myBusinessLogic = (dinos) => {
  const human = getHumanData();
  dinos.shuffle();

  const randomNumber = Math.floor(Math.random() * 3);
  const compareMethod = dinos.getCompareMethod(randomNumber);
  dinos.getDinos().forEach((dino) => {
    compareMethod(dino, human);
  });

  hideForm();
  createTiles(dinos.getDinos(), human);
};

/**
 * @description Create tiles from given dinos and human.
 * @param {Array} dinos - All dinos.
 * @param {Dino} human  - Human object created from Dino.
 */
const createTiles = (dinos, human) => {
  const grid = document.getElementById('grid');

  dinos.forEach((element, index) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    // tile 4 must be the human tile, we check of index 4
    if (index === 4) {
      // human tile
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const header = document.createElement('h3');
      header.innerText = human.species;
      gridItem.appendChild(header);

      const img = document.createElement('img');
      img.src = human.image;
      gridItem.appendChild(img);
      grid.appendChild(gridItem);
    }
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

    grid.appendChild(gridItem);
  });
};

/**
 * @description Hide forms in website.
 */
const hideForm = () => {
  const test = document.querySelector('#dino-compare');
  test.style.display = test.style.display != 'none' ? 'none' : 'block';
};

/**
 * @default Add event listener for button click.
 */
document.getElementById('btn').addEventListener('click', function () {
  myBusinessLogic(dinosFactory);
});

/**
 * @description Callback for event listener.
 */
const callBack = () => {
  myBusinessLogic(dinosFactory);
};

/**
 * Init dino data from local json file when windows is loaded.
 */
window.onload = async () => {
  await getDinoData().then((result) => {
    parseDinosToArray(result).forEach((element) => {
      dinosFactory.addDino(element);
    });
  });
};
