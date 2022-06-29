function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const reserveForm = document.forms["reserve"];

/* Events */
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeBtn.addEventListener("click", closeModal);

// Start form submission
reserveForm.addEventListener("submit", submitForm);

/* Functions */
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Submit form
function submitForm(e) {
  e.preventDefault();

  let errors = [];

  validateFirstName(reserveForm.first.value, errors);
  validateLastName(reserveForm.last.value, errors);
  validateEmail(reserveForm.email.value, errors);
  validateQuantity(reserveForm.quantity.value, errors);
  validateLocation(reserveForm.location.value, errors);
  validateCheckbox1(reserveForm.checkbox1.checked, errors);

  if (errors.length == 0) {
    // Continue (show vaidation msg)
    console.log("okay");
  }
  // Form not valid: stop submission
  else {
    console.log(errors);
    showErrors(errors);
    return;
  }
}

function validateFirstName(value, errors) {
  if (value.length < 2) errors.push("first");
}

function validateLastName(value, errors) {
  if (value.length < 2) errors.push("last");
}

function validateEmail(value, errors) {
  const reEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reEmail.test(value)) errors.push("email");
}

function validateQuantity(value, errors) {
  if (isNaN(value) || value.length == 0) errors.push("quantity");
}

function validateLocation(value, errors) {
  console.log(value);
  if (value.length == 0) errors.push("location"); // TODO: Voir s'il faudrait pas des vérification supplémentaires
}

function validateCheckbox1(isChecked, errors) {
  if (!isChecked) errors.push("checkbox1");
}

function showErrors(errors) {
  return;
}
