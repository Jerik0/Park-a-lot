(() => {
  "use strict";

  let smallSelected = $('#small');
  let mediumSelected = $('#medium');
  let largeSelected = $('#large');
  let parkingBtn = $('#get-parking-btn');
  let radioVal;
  let carInfo = $('#car-info-container');

  const getRadioVal = (form, name) => {
    let radios = form.elements[name];
    let val;

    for(let i=0, len = radios.length; i<len; i++) {
      if(radios[i].checked) {
        val = radios[i].id;
        break;
      }
    }
    return val;
  };

  parkingBtn.click(() => {
    radioVal = getRadioVal(document.getElementById('car-size'), 'size');
    console.log(radioVal);
    switch(radioVal) {
      case 'small':
        carInfo.html(`You can park in any space!`);
        break;
      case 'medium':
        carInfo.html(`You may park in any space numbered from 51 to 200`);
        break;
      case 'large':
        carInfo.html('You may only park in large spaces.');
        break;
    }
  });



  const parkLogic = (spaces) => {
    const smallSpaces = spaces.small;
    const mediumSpaces = spaces.medium;
    const largeSpaces = spaces.large;
  };

  const parkDisplay = (total) => {

    console.log(`There are ${total} spaces available.`);

  };

  $.ajax('spaces-data.json').done(function(data, status) {
    let total = (data.spaces.small + data.spaces.medium + data.spaces.large);
    parkDisplay(total);
    parkLogic(data.spaces);
  });

})();