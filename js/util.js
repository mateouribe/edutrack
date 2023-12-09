// validation for zipcode
$.validator.addMethod(
  "canadianZipCode",
  function (value, element) {
    return /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/i.test(value);
  },
  "Please enter a valid Canadian ZIP code"
);

// validation for phone number
$.validator.addMethod(
  "validPhoneNumber",
  function (value, element) {
    return /^\d{10}$/i.test(value);
  },
  "Please enter a valid 10-digit phone number"
);

// validation for room #
$.validator.addMethod(
  "validRoomNumber",
  function (value, element) {
    return /^[A-Z]\d{3}$/i.test(value);
  },
  "Please enter a valid room number format (e.g., A000)"
);

// validation for date in future
$.validator.addMethod(
  "futureDate",
  function (value, element) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let inputDate = new Date(value);
    return this.optional(element) || inputDate > today;
  },
  "The date must be in the future"
);

// validation for date in past
$.validator.addMethod(
  "pastDate",
  function (value, element) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let inputDate = new Date(value);
    return this.optional(element) || inputDate < today;
  },
  "The date must be in the past"
);

// ****** ADD FORMS VALIDATION ******
const doValidation_addUser = () => {
  let form = $("#addUserForm");

  form.validate({
    rules: {
      addUser_role: {
        required: true,
      },
      addUser_fullName: {
        required: true,
        minlength: 5,
        maxlength: 100,
      },
      addUser_dateOfBirth: {
        required: true,
        date: true,
        pastDate: true,
      },
      addUser_phoneNumber: {
        required: true,
        validPhoneNumber: true,
      },
      addUser_zipCode: {
        required: true,
        canadianZipCode: true,
      },
      addUser_username: {
        required: true,
        minlength: 5,
      },
      addUser_password: {
        required: true,
        minlength: 10,
      },
    },

    messages: {
      addUser_role: {
        required: "Please select a valid role",
      },
      addUser_fullName: {
        required: "Please enter a valid name",
        minlength: "Name must be at least 5 characters long",
        maxlength: "Name must be less than 100 characters long",
      },
      addUser_dateOfBirth: {
        required: "Please enter a valid date",
        date: "Please enter a valid date",
      },
      addUser_phoneNumber: {
        required: "Please enter a valid phone number",
        validPhoneNumber: "Please enter a valid 10-digit phone number",
      },
      addUser_zipCode: {
        required: "Please enter a valid Canadian ZIP code",
      },
      addUser_username: {
        required: "Please enter a valid username",
        minlength: "Username must be at least 5 characters long",
      },
      addUser_password: {
        required: "Please enter a valid password",
        minlength: "Password must be at least 10 characters long",
      },
    },
  });

  return form.valid();
};

const doValidation_addEvent = () => {
  let form = $("#addEventForm");

  form.validate({
    rules: {
      addEvent_title: {
        required: true,
        minlength: 5,
        maxlength: 100,
      },
      addEvent_description: {
        required: true,
      },
      addEvent_date: {
        required: true,
        date: true,
        futureDate: true,
      },
      addEvent_cost: {
        required: true,
        number: true,
        minlength: 0,
      },
      addEvent_type: {
        required: true,
      },
      addEvent_location: {
        required: true,
      },
      addEvent_duration: {
        required: true,
      },
    },
    messages: {
      addEvent_title: {
        required: "Please enter a valid event title",
        minlength: "Event title must be at least 5 characters long",
        maxlength: "Event title must be less than 100 characters long",
      },
      addEvent_description: {
        required: "Please enter a valid event description",
      },
      addEvent_date: {
        required: "Please enter a valid date",
        date: "Please enter a valid date",
      },
      addEvent_cost: {
        required: "Please enter a valid cost",
        number: "Please enter a valid number",
        minlength: "Cost must be at least 0",
      },
      addEvent_type: {
        required: "Please select a valid event type",
      },
      addEvent_location: {
        required: "Please enter a valid event location",
      },
      addEvent_duration: {
        required: "Please enter a valid event duration",
      },
    },
  });

  return form.valid();
};

const doValidation_addAttendance = () => {
  let form = $("#addAttendanceForm");

  form.validate({
    rules: {
      addAttendance_class: {
        required: true,
      },
      addAttendance_dateTaken: {
        required: true,
        date: true,
      },
      addAttendance_roomNumber: {
        required: true,
        validRoomNumber: true,
      },
    },
    messages: {
      addAttendance_class: {
        required: "Please select a valid class",
      },
      addAttendance_dateTaken: {
        required: "Please enter a valid date",
        date: "Please enter a valid date",
      },
      addAttendance_roomNumber: {
        required: "Please enter a valid room number",
        validRoomNumber: "Please enter a valid room number format (e.g., A000)",
      },
    },
  });

  return form.valid();
};

const doValidation_login = () => {
  let form = $("#loginForm");

  form.validate({
    rules: {
      login_username: {
        required: true,
      },
      login_password: {
        required: true,
      },
    },
    messages: {
      login_username: {
        required: "Please enter a valid username",
      },
      login_password: {
        required: "Please enter a valid password",
      },
    },
  });

  return form.valid();
};

const doValidation_addClass = () => {
  let form = $("#addClassForm");

  form.validate({
    rules: {
      addClass_name: {
        required: true,
      },
      addClass_description: {
        required: true,
      },
      addClass_roomNumber: {
        required: true,
        validRoomNumber: true,
      },
      addClass_startDate: {
        required: true,
        date: true,
        futureDate: true,
      },
      addClass_endDate: {
        required: true,
        date: true,
        futureDate: true,
      },
    },
    messages: {
      addClass_name: {
        required: "Please enter a class name",
      },
      addClass_description: {
        required: "Please enter a class description",
      },
      addClass_roomNumber: {
        required: "Please enter a room number",
        validRoomNumber: "Please enter a valid room number format (e.g., A000)",
      },
      addClass_startDate: {
        required: "Please enter a start date",
        date: "Please enter a valid date",
      },
      addClass_endDate: {
        required: "Please enter an end date",
        date: "Please enter a valid date",
      },
    },
  });

  return form.valid();
};

// ****** EDIT FORMS VALIDATION ******
const doValidation_editUser = () => {
  let form = $("#editUserForm");

  form.validate({
    rules: {
      editUser_fullName: {
        required: true,
        minlength: 5,
        maxlength: 100,
      },
      editUser_dateOfBirth: {
        required: true,
        date: true,
        pastDate: true,
      },
      editUser_phoneNumber: {
        required: true,
        validPhoneNumber: true,
      },
      editUser_address: {
        required: true,
        minlength: 5,
      },
      editUser_zipCode: {
        required: true,
        canadianZipCode: true,
      },
      editUser_username: {
        required: true,
        minlength: 5,
      },
      editUser_password: {
        required: true,
        minlength: 10,
      },
    },

    messages: {
      editUser_fullName: {
        required: "Please enter a valid name",
        minlength: "Name must be at least 5 characters long",
        maxlength: "Name must be less than 100 characters long",
      },
      editUser_dateOfBirth: {
        required: "Please enter a valid date",
        date: "Please enter a valid date",
      },
      editUser_phoneNumber: {
        required: "Please enter a valid phone number",
        validPhoneNumber: "Please enter a valid 10-digit phone number",
      },
      editUser_address: {
        required: "Please enter an address",
        minlength: "Address must be at least 5 characters long",
      },
      editUser_zipCode: {
        required: "Please enter a valid Canadian ZIP code",
      },
      editUser_username: {
        required: "Please enter a valid username",
        minlength: "Username must be at least 5 characters long",
      },
      editUser_password: {
        required: "Please enter a valid password",
        minlength: "Password must be at least 10 characters long",
      },
    },
  });

  return form.valid();
};

const doValidation_editClass = () => {
  let form = $("#editClassForm");

  form.validate({
    rules: {
      editClass_name: {
        required: true,
      },
      editClass_description: {
        required: true,
      },
      editClass_roomNumber: {
        required: true,
        validRoomNumber: true,
      },
      editClass_startDate: {
        required: true,
        date: true,
        futureDate: true,
      },
      editClass_endDate: {
        required: true,
        date: true,
        futureDate: true,
      },
    },
    messages: {
      editClass_name: {
        required: "Please enter a class name",
      },
      editClass_description: {
        required: "Please enter a class description",
      },
      editClass_roomNumber: {
        required: "Please enter a room number",
        validRoomNumber: "Please enter a valid room number format (e.g., A000)",
      },
      editClass_startDate: {
        required: "Please enter a start date",
        date: "Please enter a valid date",
      },
      editClass_endDate: {
        required: "Please enter an end date",
        date: "Please enter a valid date",
      },
    },
  });

  return form.valid();
};
