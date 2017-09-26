(() => {
  "use strict";

  let smallSelected = $('#small');
  let mediumSelected = $('#medium');
  let largeSelected = $('#large');
  let parkingBtn = $('#get-parking-btn');
  let carInfo = $('#car-info-container');
  let chosenSpaces = [];
  let infoBtn = $('#info-getter');
  let spacesLeft = $('#spaces-info-display');

  const getRadioVal = (form, name) => {
    let val;
    let radios = form.elements[name];

    for(let i=0, len = radios.length; i<len; i++) {
      if(radios[i].checked) {
        val = radios[i].id;
        break;
      }
    }
    return val;
  };

  parkingBtn.click(() => {
    let radioVal;
    radioVal = getRadioVal(document.getElementById('car-size'), 'size');
    console.log(radioVal);
    receiptPrint(radioVal);
    infoGetter();
  });

  infoBtn.click(() => {
    infoGetter();
  });

  //Receives picked space number. if 1-50, subtracts one from small. if 51-100, subtracts one from medium. if 101-200, subtracts one from large.
  const parkLogic = (space) => {
    let smallSpaces = space.small;
    let mediumSpaces = space.medium;
    let largeSpaces = space.large;
    let newSmall;
    let newMedium;
    let newLarge;

    if((space >= 1) && (space <= 50)) {
      newSmall = (smallSpaces - 1);
      infoSetter(newSmall, 'small');
    } else if((space > 50) && (space <= 100)) {
      newMedium = (mediumSpaces - 1);
      infoSetter(newMedium, 'medium');
    } else {
      newLarge = (largeSpaces - 1);
      infoSetter(newLarge, 'large');
    }
    //TODO Then call parkDisplay again to display total spaces again.
  };

  //Takes in size
  const spacePicker = (size) => {
    switch(size) {
      case 'small':
        let smallPicked = Math.floor(Math.random() * (50-1) + 1);
        chosenSpaces.push(smallPicked);
        return smallPicked;
        break;
      case 'medium':
        let medPicked = Math.floor(Math.random() * (200-51) + 51);
        chosenSpaces.push(medPicked);
        return medPicked;
        break;
      case 'large':
        let largePicked = Math.floor(Math.random() * (200-101) + 101);
        chosenSpaces.push(largePicked);
        return largePicked;
        break;
    }
  };

  const spaceComparer = () => {
    //TODO Compare randomly chosen number to all numbers in chosenSpaces array. If match found, pick another space until match is not found. If no spaces remaining, alert customer that no spaces remain.
  };

  const spaceReturn = () => {
    //TODO Get space number from user, remove that number from chosenSpaces array to be available for picking.
  };

  const parkDisplay = (total) => {
    spacesLeft.html(`There are ${total} spaces available.`);
    //TODO Display how many small medium and large spaces available

  };

  const receiptPrint = (size) => {
    //TODO Print number of the space assigned to customer
    console.log("Your space number is " + spacePicker(size));
  };

  const infoGetter = () => {
    $.ajax('spaces-data.json').done(function(data, status) {
      let total = (data.spaces.small + data.spaces.medium + data.spaces.large);
      parkDisplay(total);
      parkLogic(data.spaces);
    });
  };

  //TODO Make this function post new available space total to JSON file.
  const infoSetter = (newCount, size) => {
    $.post('spaces-data.json', `'space.${size}': '${newCount}'`);
  }


})();