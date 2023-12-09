$(document).ready(function () {
  init();
  initDB();
});

function init() {
  if (localStorage.getItem("currentUserId")) {
    $(location).prop("href", "#homePage");
  }

  //*************** ON CLICK EVENTS ***************
  $("#addUserBtn").on("click", addUserBtn_click);
  $("#addEventBtn").on("click", addEventBtn_click);
  $("#addAttendanceBtn").on("click", addAttendanceBtn_click);
  $("#addClassBtn").on("click", addClassBtn_click);
  $("#loginBtn").on("click", loginBtn_click);
  $("#dropDatabase").on("click", dropDatabase_click);
  $(".signOutBtn").on("click", signOutBtn_click);
  $("#editUserBtn").on("click", editUserBtn_click);
  $("#editClassBtn").on("click", editClassBtn_click);
  $(".edit-profile-btn").on("click", editProfileBtn_click);

  //*************** ON PAGE LOAD EVENTS ***************
  $("#loginPage").on("pageshow", loginPage_show);
  $(
    "#homePage, #eventPage, #usersPanelPage, #attendancePanelPage, #classesPanelPage, #eventsPanelPage"
  ).on("pageshow", setScreensPermissions);
  $("#homePage").on("pageshow", homePage_show);

  //***** Panel pages
  $("#classesPanelPage").on("pageshow", classesPanelPage_show);
  $("#usersPanelPage").on("pageshow", usersPanelPage_show);
  $("#eventsPanelPage").on("pageshow", eventsPanelPage_show);

  //***** Dynamically loaded pages
  $("#eventPage").on("pageshow", eventPage_show);
  $("#classPage").on("pageshow", classPage_show);

  ///***** Manage pages
  $("#manageUsersPage").on("pageshow", manageUsersPage_show);
  $("#manageClassesPage").on("pageshow", manageClassesPage_show);

  //***** Edit pages
  $("#editUserPage").on("pageshow", editUserPage_show);
  $("#editClassPage").on("pageshow", editClassPage_show);
}

function initDB() {
  try {
    DB.createDatabase();
    if (dbOpen) {
      DB.createTables();
      DB.createAdminUser();
    }
  } catch (e) {
    console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
  }
}

//ON CLICK EVENT HANDLERS
function addUserBtn_click() {
  addUserValidation();
}

function addEventBtn_click() {
  addEventValidation();
}

function addAttendanceBtn_click() {
  addAttendanceValidation();
}

function addClassBtn_click() {
  addClassValidation();
}

function loginBtn_click() {
  loginValidation();
}

function dropDatabase_click() {
  DB.dropDatabase();
}

function signOutBtn_click() {
  signOut();
}

function editUserBtn_click() {
  editUserValidation();
}

function editClassBtn_click() {
  editClassValidation();
}

function editProfileBtn_click() {
  localStorage.setItem(
    "currentEditUserId",
    localStorage.getItem("currentUserId")
  );
}
//ON PAGE LOAD EVENT HANDLERS
function loginPage_show() {
  if (localStorage.getItem("currentUserId")) {
    $(location).prop("href", "#homePage");
  }
}

function homePage_show() {
  loadEventsCards("#eventsContainer");
}

function eventPage_show() {
  loadEventPage();
}

function classPage_show() {
  loadClassPage();
}

function classesPanelPage_show() {
  if (
    localStorage.getItem("authorizationLevel") == 0 ||
    localStorage.getItem("authorizationLevel") == null
  ) {
    loadClassesCards("#student_classesContainer", "student");
  }
}

function usersPanelPage_show() {
  if (
    localStorage.getItem("authorizationLevel") == 0 ||
    localStorage.getItem("authorizationLevel") == null
  ) {
    loadUsersCards("#student_usersContainer", "student");
  }
}

function eventsPanelPage_show() {
  if (
    localStorage.getItem("authorizationLevel") == 0 ||
    localStorage.getItem("authorizationLevel") == null
  ) {
    loadEventsCards("#student_eventsContainer");
  }
}

function manageUsersPage_show() {
  if (
    localStorage.getItem("authorizationLevel") == 1 ||
    localStorage.getItem("authorizationLevel") == 2
  ) {
    loadUsersCards("#admin_studentsContainer");
  }
}

function manageClassesPage_show() {
  if (
    localStorage.getItem("authorizationLevel") == 1 ||
    localStorage.getItem("authorizationLevel") == 2
  ) {
    loadClassesCards("#admin_classesContainer");
  }
}

function editUserPage_show() {
  loadEditUserPage();
}

function editClassPage_show() {
  loadEditClassPage();
}
