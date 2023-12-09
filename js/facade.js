// ********************************************** Global variables
// let authorizationLevel = 0;
// 0 = student
// 1 = teacher
// 2 = admin

// ********************************************** Validations
// **** Add validations
const addUserValidation = () => {
  if (doValidation_addUser()) {
    let role = $("#addUser_role").val();
    let fullName = $("#addUser_fullName").val();
    let dateOfBirth = $("#addUser_dateOfBirth").val();
    let phoneNumber = $("#addUser_phoneNumber").val();
    let address = $("#addUser_address").val();
    let zipcode = $("#addUser_zipcode").val();
    let username = $("#addUser_username").val();
    let password = $("#addUser_password").val();

    let user = new User(
      role,
      fullName,
      dateOfBirth,
      phoneNumber,
      address,
      zipcode,
      username,
      password
    );

    let success = function (tx, result) {
      alert("User added successfully");
      $(location).prop("href", "#homePage");
    };

    users.addUser(user, success);
  } else {
    console.error("Add user form is invalid");
  }
};

const addEventValidation = () => {
  if (doValidation_addEvent()) {
    let title = $("#addEvent_title").val();
    let description = $("#addEvent_description").val();
    let date = $("#addEvent_date").val();
    let cost = $("#addEvent_cost").val();
    let type = $("#addEvent_type").val();
    let location = $("#addEvent_location").val();
    let duration = $("#addEvent_duration").val();

    let event = new Event(
      title,
      description,
      date,
      cost,
      type,
      location,
      duration
    );

    let success = function (tx, result) {
      alert("Event added successfully");
      $(location).prop("href", "#homePage");
    };

    // console.log(JSON.stringify(event));

    events.addEvent(event, success);
  } else {
    console.error("Add event form is invalid");
  }
};

const addAttendanceValidation = () => {
  if (doValidation_addAttendance()) {
    console.info("Add attendance form is valid");
  } else {
    console.error("Add attendace form is invalid");
  }
};

const addClassValidation = () => {
  if (doValidation_addClass()) {
    let name = $("#addClass_name").val();
    let description = $("#addClass_description").val();
    let roomNumber = $("#addClass_roomNumber").val();
    let startDate = $("#addClass_startDate").val();
    let endDate = $("#addClass_endDate").val();
    let imageId = Math.floor(Math.random() * 7) + 1;

    let classObj = new Class(
      name,
      imageId,
      description,
      roomNumber,
      startDate,
      endDate
    );

    let success = function (tx, result) {
      alert("Class added successfully");
      $(location).prop("href", "#homePage");
    };

    classes.addClass(classObj, success);
  } else {
    console.error("Add class form is invalid");
  }
};

// **** Edit validations
const editUserValidation = () => {
  if (doValidation_editUser()) {
    let userId = localStorage.getItem("currentEditUserId");
    let role = $("#editUser_role").val();
    let fullName = $("#editUser_fullName").val();
    let dateOfBirth = $("#editUser_dateOfBirth").val();
    let phoneNumber = $("#editUser_phoneNumber").val();
    let address = $("#editUser_address").val();
    let zipcode = $("#editUser_zipcode").val();
    let username = $("#editUser_username").val();
    let password = $("#editUser_password").val();

    let user = new User(
      role,
      fullName,
      dateOfBirth,
      phoneNumber,
      address,
      zipcode,
      username,
      password
    );

    let success = function (tx, result) {
      alert("User edited successfully");
      $(location).prop("href", "#usersPanelPage");
    };

    users.editUser(userId, user, success);
  } else {
    console.error("Edit user form is invalid");
  }
};

const editClassValidation = () => {
  if (doValidation_editClass()) {
    let classId = localStorage.getItem("currectClassId");
    let name = $("#editClass_name").val();
    let description = $("#editClass_description").val();
    let roomNumber = $("#editClass_roomNumber").val();
    let startDate = $("#editClass_startDate").val();
    let endDate = $("#editClass_endDate").val();
    let imageId = Math.floor(Math.random() * 7) + 1;

    let classObj = new Class(
      name,
      imageId,
      description,
      roomNumber,
      startDate,
      endDate
    );

    let success = function (tx, result) {
      alert("Class edited successfully");
      $(location).prop("href", "#classesPanelPage");
    };

    classes.editClass(classId, classObj, success);
  }
};

// **** Login
const loginValidation = () => {
  if (doValidation_login()) {
    let username = $("#login_username").val();
    let password = $("#login_password").val();

    let success = function (tx, result) {
      //Successfull login
      if (result.rows.length > 0) {
        let user;
        users.getUserByUsername(username, function (tx, result) {
          user = result.rows[0];
          localStorage.setItem("currentUserId", user.id);

          // Set the authorization level
          switch (user.role) {
            case "admin":
              localStorage.setItem("authorizationLevel", 2);
              break;
            case "teacher":
              localStorage.setItem("authorizationLevel", 1);
              break;
            case "student":
              localStorage.setItem("authorizationLevel", 0);
              break;
            default:
              localStorage.setItem("authorizationLevel", 0);
              break;
          }

          // Set the screens permissions
          setScreensPermissions();
        });

        // Redirect to the homepage
        $(location).prop("href", "#homePage");
      }
      //Unsuccessfull login
      else {
        alert("Incorrect username or password. Please try again.");
      }
    };

    users.login(username, password, success);
  } else {
    console.error("Login form is invalid");
  }
};

const signOut = () => {
  localStorage.clear();
  $(location).prop("href", "#loginPage");
};

// ********************************************** Load functions

// **** Permission
const setScreensPermissions = () => {
  $(".admin, .student, .teacher").hide();

  let authorizationLevel = localStorage.getItem("authorizationLevel");
  //Student
  if (authorizationLevel === null || authorizationLevel === "0") {
    $(".student").show();
  }

  //Teacher
  if (authorizationLevel === "1") {
    $(".student").hide();
    $(".teacher").show();
  }

  //Admin
  if (authorizationLevel === "2") {
    $(".student").hide();
    $(".admin, .teacher").show();
  }
};

// **** Cards
const loadEventsCards = (containerReference) => {
  let success = function (tx, result) {
    let htmlCode = "";

    if (result.rows.length <= 0) {
      htmlCode += "<li>No events found</li>";
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        let event = result.rows[i];

        htmlCode += `
        <div class="event-card-container">
          <img src=${
            event.type === "academic"
              ? "../img/academicActivity.png"
              : event.type === "sports"
              ? "../img/sportsActivity.png"
              : event.type === "cultural"
              ? "../img/culturalActivity.png"
              : event.type === "social"
              ? "../img/socialActivity.png.png"
              : event.type === "fundraising"
              ? "../img/fundraisingActivity.png"
              : undefined
          } class="event-card-image" />
          <div class="event-card-content-container">
            <div class="info-event-container">
              <div class="info-event-top">
                <h3 class="info-event-title">${event.title}</h3>
                <div class="info-event-category">
                  <p>${
                    event.type.charAt(0).toUpperCase() + event.type.slice(1)
                  }</p>
                </div>
              </div>
              <div class="info-event-bottom">
                <p class="info-event-price">${
                  event.cost > 0 ? "$" + event.cost : "FREE"
                }</p>
                <p class="info-event-date">${event.date}</p>
              </div>
            </div>

            <a class="see-more-container" href="#eventPage" data-row-id=${
              event.id
            }>
              <p class="see-more-text">See more</p>
              <span>></span>
            </a>
          </div>
        </div>
        `;
      }
    }

    let container = $(containerReference);
    container.html(htmlCode);

    function clickHandler() {
      localStorage.setItem("currentEventId", $(this).attr("data-row-id"));
      $(location).prop("href", "#eventPage");
    }

    $(`${containerReference} .see-more-container`).on("click", clickHandler);
  };

  events.getAll(success);
};

const loadClassesCards = (containerReference, role = "admin") => {
  let success = function (tx, result) {
    if (result.rows.length <= 0) {
      $(containerReference).html("<li>No classes found</li>");
      return;
    }

    let rows = Array.from(result.rows); // Convert to array

    if (role === "admin") {
      // For admin, just list the class names
      let htmlCode = rows
        .map(
          (classObj) => `
        <a class="class-card-container" data-row-id=${classObj.id}>
          <img src="../img/class${classObj.imageId}.png" class="class-card-img border-${classObj.imageId}" />
          <div class="class-card-info-container">
            <h3 class="class-card-name text-shadow-none">${classObj.name}</h3>
          </div>
        </a>
      `
        )
        .join("");
      $(containerReference).html(htmlCode);
    } else {
      let userId = localStorage.getItem("currentUserId");
      let promises = [];

      rows.forEach((classObj) => {
        // Create a promise for each class attendance check
        let promise = new Promise((resolve, reject) => {
          classes.checkUserAttendance(classObj.id, userId, (isAttending) => {
            let classStatus = isAttending ? "Attending" : "Not attending";
            resolve({ classObj, classStatus });
          });
        });
        promises.push(promise);
      });

      Promise.all(promises).then((classesData) => {
        let htmlCode = classesData
          .map(
            ({ classObj, classStatus }) => `
          <a class="class-card-container" data-row-id=${classObj.id}>
            <img src="../img/class${classObj.imageId}.png" class="class-card-img border-${classObj.imageId}" />
            <div class="class-card-info-container">
              <h3 class="class-card-name text-shadow-none">${classObj.name}</h3>
              <p class="class-status text-shadow-none">${classStatus}</p>
            </div>
          </a>
        `
          )
          .join("");

        $(containerReference).html(htmlCode);
      });
    }

    $(`${containerReference} a`).on("click", function () {
      localStorage.setItem("currectClassId", $(this).attr("data-row-id"));
      $(location).prop(
        "href",
        role === "admin" ? "#editClassPage" : "#classPage"
      );
    });
  };

  classes.getAll(success);
};

const loadUsersCards = (containerReference, role = "admin") => {
  let success = function (tx, result) {
    let htmlCode = "";

    if (result.rows.length <= 0) {
      htmlCode += "<li>No users found</li>";
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        let user = result.rows[i];

        htmlCode +=
          role === "admin"
            ? `
            <div class="user-card-container">
              <!-- Left -->
              <div class="user-card-info-container">
                <img src="./img/blackUserIcon.svg" class="user-card-img" />
                <div class="user-card-name-role">
                  <p class="text-shadow-none">${user.fullName}</p>
                  <p class="text-shadow-none">${
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  }</p>
                </div>
              </div>

              <!-- Right -->
              <div class="user-card-actions">
                <a data-row-id=${
                  user.id
                } class="edit-user"><i class="fa-solid fa-pen text-main"></i></a>
                <a data-row-id=${
                  user.id
                } class="delete-user"><i class="fa-solid fa-trash text-main"></i></a>
              </div>
            </div>
        `
            : `
            <div class="user-card-container">
              <!-- Left -->
              <div class="user-card-info-container">
                <img src="./img/blackUserIcon.svg" class="user-card-img" />
                <div class="user-card-name-role">
                  <p class="text-shadow-none">${user.fullName}</p>
                  <p class="text-shadow-none">${
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  }</p>
                </div>
              </div>
            </div>
            `;
      }
    }

    let container = $(containerReference);
    container.html(htmlCode);

    function edit_clickHandler() {
      localStorage.setItem("currentEditUserId", $(this).attr("data-row-id"));
      $(location).prop("href", "#editUserPage");
    }

    function delete_clickHandler() {
      // localStorage.setItem("currentEventId", $(this).attr("data-row-id"));
      $(location).prop("href", "#manageUsersPage");
    }

    $(`${containerReference} .edit-user`).on("click", edit_clickHandler);
    $(`${containerReference} .delete-user`).on("click", delete_clickHandler);
  };

  users.getAll(success);
};

// **** Single pages
const loadEventPage = () => {
  let eventId = localStorage.getItem("currentEventId");

  let success = function (tx, result) {
    let event = result.rows[0];

    $("#eventPage_img").attr(
      "src",
      event.type === "academic"
        ? "../img/academicActivity.png"
        : event.type === "sports"
        ? "../img/sportsActivity.png"
        : event.type === "cultural"
        ? "../img/culturalActivity.png"
        : event.type === "social"
        ? "../img/socialActivity.png.png"
        : event.type === "fundraising"
        ? "../img/fundraisingActivity.png"
        : undefined
    );

    $("#eventPage_title").text(event.title);
    $("#eventPage_description").text(event.description);
    $("#eventPage_date").text("📅 " + event.date);
    $("#eventPage_cost").text(event.cost > 0 ? "💵 $" + event.cost : "FREE");
    $("#eventPage_type").text(
      event.type.charAt(0).toUpperCase() + event.type.slice(1)
    );
    $("#eventPage_location").text("📍 " + event.location);
    $("#eventPage_duration").text("⏳ " + event.duration);
  };

  events.getEventById(eventId, success);
};

const loadClassPage = () => {
  let classId = localStorage.getItem("currectClassId");

  let success = function (tx, result) {
    let userId = localStorage.getItem("currentUserId");
    let classObj = result.rows[0];

    classes.checkUserAttendance(classId, userId, function (isAttending) {
      let buttonText;
      if (isAttending) {
        buttonText = "You are taking this class!";
        $("#classPageBtn").prop("disabled", true);
      } else {
        buttonText = "Take class";
        $("#classPageBtn").prop("disabled", false);
      }

      $("#classPage_img").attr(
        "src",
        "../img/class" + classObj.imageId + ".png"
      );
      $("#classPage_name").text(classObj.name);
      $("#classPage_roomNumber").text(classObj.roomNumber);
      $("#classPage_startDate").text(classObj.startDate);
      $("#classPage_endDate").text(classObj.endDate);
      $("#classPage_description").text(classObj.description);
      $("#classPageBtn").text(buttonText);

      $("#classPageBtn")
        .off("click")
        .on("click", function () {
          if (!isAttending) {
            let success = function (tx, result) {
              alert("You are now taking this class!");
              $(location).prop("href", "#classesPanelPage");
            };

            classes.takeClass(classId, userId, success);
          } else {
            alert("You are already taking this class!");
          }
        });
    });
  };

  classes.getClassById(classId, success);
};

// **** Edit pages
const loadEditUserPage = () => {
  let userId = localStorage.getItem("currentEditUserId");

  let success = function (tx, result) {
    let user = result.rows[0];

    $("#editUser_role").val(user.role);
    $("#editUser_fullName").val(user.fullName);
    $("#editUser_dateOfBirth").val(user.dateOfBirth);
    $("#editUser_phoneNumber").val(user.phoneNumber);
    $("#editUser_address").val(user.address);
    $("#editUser_zipcode").val(user.zipcode);
    $("#editUser_username").val(user.username);
    $("#editUser_password").val(user.password);
  };

  users.getUserById(userId, success);
};

const loadEditClassPage = () => {
  let classId = localStorage.getItem("currectClassId");

  let success = function (tx, result) {
    let classObj = result.rows[0];

    $("#editClass_name").val(classObj.name);
    $("#editClass_description").val(classObj.description);
    $("#editClass_roomNumber").val(classObj.roomNumber);
    $("#editClass_startDate").val(classObj.startDate);
    $("#editClass_endDate").val(classObj.endDate);
  };

  classes.getClassById(classId, success);
};
