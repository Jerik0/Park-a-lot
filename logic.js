(() => {
  "use strict";

  $.ajax('spaces-data.json').done(function(data, status) {
    let total = (data.spaces.small + data.spaces.medium + data.spaces.large);
    parkDisplay(total);
    parkLogic(data.spaces);
  });

  let parkLogic = (spaces) => {
    const smallSpaces = spaces.small;
    const mediumSpaces = spaces.medium;
    const largeSpaces = spaces.large;


  };

  let parkDisplay = (total) => {

    console.log(`There are ${total} spaces available.`);
  };

})();