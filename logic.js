(() => {
  "use strict";

  let smallSelected = $('#small');
  let mediumSelected = $('#medium');
  let largeSelected = $('#large');
  let parkingBtn = $('#get-parking-btn');
  let carInfo = $('#car-info-container');
  let chosenSpaces = [];

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
  });

  //Receives picked space number. if 1-50, subtracts one from small. if 51-100, subtracts one from medium. if 101-200, subtracts one from large.
  const parkLogic = (space) => {
    let smallSpaces = space.small;
    let mediumSpaces = space.medium;
    let largeSpaces = space.large;

    if((space >= 1) && (space <= 50)) {
      smallSpaces = (smallSpaces - 1);
    } else if((space > 50) && (space <= 100)) {
      mediumSpaces = (mediumSpaces - 1);
    } else largeSpaces = (largeSpaces - 1);
    //TODO Then call parkDisplay again to display total spaces again.
  };

  const spacePicker = (size) => {
    switch(size) {
      case 'small':
        let smallPicked = Math.floor(Math.random() * (50-1) + 1);
        return smallPicked;
        break;
      case 'medium':
        let medPicked = Math.floor(Math.random() * (200-51) + 51);
        return medPicked;
        break;
      case 'large':
        let largePicked = Math.floor(Math.random() * (200-101) + 101);
        return largePicked;
        break;
    }
  };

  const parkDisplay = (total) => {

    console.log(`There are ${total} spaces available.`);

    //TODO Display how many small medium and large spaces available

  };

  const receiptPrint = (size) => {
    //TODO Print number of the space assigned to customer
    console.log("Your space number is " + spacePicker(size));
  };

  $.ajax('spaces-data.json').done(function(data, status) {
    let total = (data.spaces.small + data.spaces.medium + data.spaces.large);
    parkDisplay(total);
    parkLogic(data.spaces);
  });

})();