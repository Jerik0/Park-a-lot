(() => {
  "use strict";

  //=================Global Variables==================
  let smallSelected = $('#small');
  let mediumSelected = $('#medium');
  let largeSelected = $('#large');
  let parkingBtn = $('#get-parking-btn');
  let carInfo = $('#car-info-container');
  let chosenSpaces = [];
  let spacesLeft = $('#spaces-info-display');
  let smallSpaces = 50;
  let mediumSpaces = 50;
  let largeSpaces = 100;

  //These set the initial count for available spaces.
  $('#small-remain').html(smallSpaces);
  $('#med-remain').html(mediumSpaces);
  $('#lg-remain').html(largeSpaces);

  //Retrieves value from checked radial button.
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

  //Clicking 'get parking' button assigns a space and gives customer a receipt.
  parkingBtn.click(() => {
    ticketPrint(getRadioVal());
  });

  //Prints to customer their space number. Parameter 'size' is passed from
  const ticketPrint = (size) => {
    //TODO Print number of the space assigned to customer on HTML.
    $('#ticket-number').html("Your space number is " + spacePicker(size));
  };


  //Receives picked space number. if 1-50, subtracts one from small. if 51-100, subtracts one from medium. if 101-200, subtracts one from large.
  const parkLogic = (space) => {
    if((space >= 1) && (space <= 50)) {
      console.log('small space');
      smallSpaces -= 1;
      lotDisplay('small', smallSpaces)
    } else if((space > 50) && (space <= 100)) {
      console.log('medium space');
      mediumSpaces -= 1;
      lotDisplay('med', mediumSpaces)
    } else if(space > 100){
      console.log('large space');
      largeSpaces -= 1;
      lotDisplay('lg', largeSpaces)
    }

    let total = (smallSpaces + mediumSpaces + largeSpaces);
    spacesLeft.html(total);

  };

  //Called by parkLogic(), which passes 'size', and remaining spaces for that category, as arguments
  const lotDisplay = (size, spaceRemain) => {
    $(`#${size}-remain`).html(spaceRemain);
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
      parkLogic(pickedNumber);
    } else if(chosenSpaces.indexOf(pickedNumber) === -1) {
        chosenSpaces.push(pickedNumber);
        parkLogic(pickedNumber);
    } else if(chosenSpaces.indexOf(pickedNumber) !== -1) {
      spacePicker(getRadioVal()); //if it's been picked, we select another number.
    }

    //if there are 200 spaces that have been chosen, notify the user that the lot is full
    if(chosenSpaces.length === 200) {
      $('#car-info-container').html("Sorry there are no more spaces!");
    }
    console.log(pickedNumber);
  };

  const spaceReturn = () => {
    //TODO Get space number from user, remove that number from chosenSpaces array to be available for picking and add the amount of spaces back to corresponding JSON data.
  };
})();