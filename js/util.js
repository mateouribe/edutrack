// Customer validation for zipcode
$.validator.addMethod(
  "canadianZipCode",
  function (value, element) {
    return /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/i.test(value);
  },
  "Please enter a valid Canadian ZIP code"
);

// Customer validation for phone number
$.validator.addMethod(
  "validPhoneNumber",
  function (value, element) {
    return /^\d{10}$/i.test(value);
  },
  "Please enter a valid 10-digit phone number"
);

// Customer validation for room #
$.validator.addMethod(
  "validRoomNumber",
  function (value, element) {
    return /^[A-Z]\d{3}$/i.test(value);
  },
  "Please enter a valid room number format (e.g., A000)"
);

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
        maxlength: 200,
      },
      addEvent_date: {
        required: true,
        date: true,
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
        maxlength: "Event description must be less than 200 characters long",
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
