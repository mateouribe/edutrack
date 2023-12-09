$(document).ready(function () {
  init();
  initDB();
});

function init() {
  const isLoggedIn = localStorage.getItem("currentUserId");
  const currentUrl = window.location.href;
  const baseUrl = [
    window.location.protocol,
    "//",
    window.location.host,
    window.location.pathname,
  ].join("");

  if (isLoggedIn) {
    // Redirect to home page only if the current URL is the base URL
    if (currentUrl === baseUrl) {
      $(location).prop("href", "#homePage");
    }
    // else stay on the current page
  }

  //*************** ON CLICK EVENTS ***************
  // ***** Forms
  $("#addUserForm").submit(function (event) {
    addUserBtn_click(event);
  });
  $("#addEventForm").submit(function (event) {
    addEventBtn_click(event);
  });
  $("#addClassForm").submit(function (event) {
    addClassBtn_click(event);
  });
  $("#loginForm").submit(loginBtn_click);
  $("#editUserForm").submit(function (event) {
    editUserBtn_click(event);
  });
  $("#editClassForm").submit(function (event) {
    editClassBtn_click(event);
  });

  $(".edit-profile-btn").on("click", editProfileBtn_click);
  $(".signOutBtn").on("click", signOutBtn_click);
  $("#deleteClassBtn").on("click", deleteClassBtn_click);
  $("#dropDatabase").on("click", dropDatabase_click);
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
function addUserBtn_click(event) {
  event.preventDefault();
  addUserValidation();
}

function addEventBtn_click(event) {
  event.preventDefault();
  addEventValidation();
}

function addAttendanceBtn_click() {
  addAttendanceValidation();
}

function addClassBtn_click(event) {
  event.preventDefault();
  addClassValidation();
}

function loginBtn_click(e) {
  e.preventDefault();
  loginValidation();
}

function dropDatabase_click() {
  DB.dropDatabase();
}

function signOutBtn_click() {
  signOut();
}

function deleteClassBtn_click() {
  handleDeleteClass();
}

function editUserBtn_click(event) {
  event.preventDefault();
  editUserValidation();
}

function editClassBtn_click(event) {
  event.preventDefault();
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
