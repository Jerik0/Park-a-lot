(() => {
  "use strict";

  let smallSelected = $('#small');
  let mediumSelected = $('#medium');
  let largeSelected = $('#large');
  let parkingBtn = $('#get-parking-btn');
  let carInfo = $('#car-info-container');

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

  const parkLogic = (spaces) => {
    const smallSpaces = spaces.small;
    const mediumSpaces = spaces.medium;
    const largeSpaces = spaces.large;
    //TODO subtract one from the corresponding space section in JSON file.
    //TODO Then send the selected space to receiptPrint()
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