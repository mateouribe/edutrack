$(document).ready(function () {
  init();
  //   initDB();
});

function init() {
  //ON CLICK EVENTS
  $("#addUserBtn").on("click", addUserBtn_click);
  $("#addEventBtn").on("click", addEventBtn_click);
}

function addUserBtn_click() {
  addUserValidation();
}

function addEventBtn_click() {
  addEventValidation();
}
