// ********************************************** Add validations

const addUserValidation = () => {
  if (doValidation_addUser()) {
    console.info("Add user form is valid");
  } else {
    console.error("Add user form is invalid");
  }
};

const addEventValidation = () => {
  if (doValidation_addEvent()) {
    console.info("Add event form is valid");
  } else {
    console.error("Add event form is invalid");
  }
};
