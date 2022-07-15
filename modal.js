/* CONSTANT */
const errorText = {
  first: "Veuillez entrer 2 caractères ou plus pour ce champ",
  last: "Veuillez entrer 2 caractères ou plus pour ce champ",
  email: "Nécessite une adresse mail valide.",
  quantity: "Vous devez entre un nombre entre 0 et 99.",
  location: "Vous devez choisir une option.",
  birthdate: "Vous devez entrer votre date de naissance.",
  checkbox1: "Vous devez vérifier que vous acceptez les termes et conditions.",
};

/* DOM ELEMENTS */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const reserveForm = document.forms["reserve"];
const modalSuccess = document.querySelector(".modal-success");
const closeBtnSuccess = document.querySelector(".close-success");
const formDatas = document.getElementsByClassName("formData");

/* EVENTS */
// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeBtn.addEventListener("click", closeModal);
closeBtnSuccess.addEventListener("click", closeModal);

// Start form submission
reserveForm.addEventListener("submit", submitForm);

/* FUNCTIONS */
// Toggle the opening/closing of the navbar for mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Launch modal
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal
function closeModal() {
  modalbg.style.display = "none";
  resetForm();
  hideSuccess();
}

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Remove any error display
  resetErrors();

  // Process validation
  const validators = [
    validateNames(reserveForm.first.value, reserveForm.first.name),
    validateNames(reserveForm.last.value, reserveForm.last.name),
    validateEmail(reserveForm.email.value, reserveForm.email.name),
    validateDate(reserveForm.birthdate.value, reserveForm.birthdate.name),
    validateQuantity(reserveForm.quantity.value, reserveForm.quantity.name),
    validateLocation(reserveForm.location.value, reserveForm.location[0].name),
    validateCheckbox1(
      reserveForm.checkbox1.checked,
      reserveForm.checkbox1.name
    ),
  ];

  // Gets errors from validation
  const errors = validators.filter((validationResult) => {
    return validationResult !== undefined;
  });

  // Form is valid: submit
  if (errors.length == 0) {
    // Continue (show validation msg)
    showSuccess();
  }
  // Form is not valid: show errors on screen
  else {
    showErrors(errors);
    return;
  }
}

// Display errors in the form
function showErrors(errors) {
  errors.forEach((err) => {
    const errorInput = document.querySelector(`[name=${err}]`);
    const errorFormData = errorInput.parentNode;

    // Set an error description/style attached to the field
    errorFormData.setAttribute("data-error-visible", "true");
    errorFormData.setAttribute("data-error", errorText[err]);
  });

  return;
}

// Display form success
function showSuccess() {
  reserveForm.style.display = "none";
  modalSuccess.style.display = "flex";
}

// Hide success
function hideSuccess() {
  reserveForm.style.display = "block";
  modalSuccess.style.display = "none";
}

//  Validate form firstname input
function validateNames(value, inputName) {
  if (value.length < 2 || isEmpty(value)) return inputName;
}

//  Validate form email input
function validateEmail(value, inputName) {
  //  Regular expression for an email adress
  const reEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reEmail.test(value) || isEmpty(value)) return inputName;
}

//  Validate form quantity input
function validateQuantity(value, inputName) {
  // isNan() consider " " (empty string) as a 0. parseInt() will only transform number from a string.
  if (isNaN(parseInt(value)) || isEmpty(value)) return inputName;
}

//  Validate form location input
function validateLocation(value, inputName) {
  if (isEmpty(value)) return inputName;
}

//  Validate form checkbox1 input
function validateCheckbox1(isChecked, inputName) {
  if (!isChecked) return inputName;
}

//  Validate birthdate input
function validateDate(value, inputName) {
  if (isEmpty(value)) return inputName;
  // Check the given date is is the past
  const valueDate = new Date(value);
  const timeInput = valueDate.getTime();

  const now = Date.now();

  if (timeInput > now) return inputName;
}
// Check that the given string is empty
function isEmpty(valueStr) {
  if (valueStr === "") return true;
  if (valueStr === undefined) return true;
  if (valueStr.length === 0) return true;

  return false;
}

// Remove error display from the form
function resetErrors() {
  for (let i = 0; i < formDatas.length; i++) {
    const formData = formDatas[i];
    formData.removeAttribute("data-error-visible");
    formData.removeAttribute("data-error");
  }
}

// Reset form state
function resetForm() {
  // Remove error messages
  resetErrors();

  // Remove inputs values
  const formInputs = document.querySelectorAll("input");
  formInputs.forEach((inputElement) => {
    // Don't modify submit input value
    if (inputElement.type === "submit") return;

    // Reset radio button value
    if (inputElement.type === "radio") {
      inputElement.checked = false;
      return;
    }

    // Reset checkbox value
    if (inputElement.type === "checkbox") {
      inputElement.checked = inputElement.name === "checkbox1" ? true : false;
      return;
    }

    // Reset other value (number/text/email/date)
    inputElement.value = "";
  });
}
