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

  //Retrieves value from checked
  const getRadioVal = () => {
    let val;
    let radios = document.getElementById('car-size').elements['size'];

    for(let i=0, len = radios.length; i<len; i++) {
      if(radios[i].checked) {
        val = radios[i].id;
        break;
      }
    }
    return val;
  };

  parkingBtn.click(() => {
    receiptPrint(getRadioVal());
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

  //Takes in size as argument from getRadioVal() and returns appropriate space number.
  const spacePicker = (size) => {
    let pickedNumber;
    switch(size) {
      case 'small':
        pickedNumber = Math.floor(Math.random() * (200-1) + 1); //small spaces run from 1-200
        spaceCompare(pickedNumber);
        return pickedNumber;
        break;
      case 'medium':
        pickedNumber = Math.floor(Math.random() * (200-51) + 51); //medium spaces run from 51-200
        spaceCompare(pickedNumber);
        return pickedNumber;
        break;
      case 'large':
        pickedNumber = Math.floor(Math.random() * (200-101) + 101); //large spaces run from 101-200
        spaceCompare(pickedNumber);
        return pickedNumber;
        break;
    }
  };

  //Has the picked number already been picked? If so, pick again until it's not found and add to chosenSpaces array.
  const spaceCompare = (pickedNumber) => {
    if(chosenSpaces.length === 0) {
      chosenSpaces.push(pickedNumber);
    } else {
      if(chosenSpaces.indexOf(pickedNumber) === -1) {
        chosenSpaces.push(pickedNumber);
      }
    }

    console.log(chosenSpaces);
    //TODO If no spaces remaining, alert customer that no spaces remain.
  };

  const spaceReturn = () => {

    //TODO Get space number from user, remove that number from chosenSpaces array to be available for picking and add the amount of spaces back to corresponding JSON data.
  };

  const parkDisplay = (total) => {
    spacesLeft.html(`There are ${total} spaces available.`);
  };

  //Prints to customer their space number. Parameter 'size' is passed from
  const receiptPrint = (size) => {
    //TODO Print number of the space assigned to customer
    console.log("Your space number is " + spacePicker(size));
  };

  //Retrieves information about
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