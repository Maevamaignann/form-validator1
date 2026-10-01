const form = document.getElementById('form');
const username = document.getElementById('username');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email invalide');
  }
}

// Check age is a whole number of at least 18
function checkAge(input) {
  const value = input.value.trim();

  if (value === '') {
    showError(input, 'Âge est requis');
    return;
  }

  const ageValue = Number(value);
  if (!Number.isInteger(ageValue)) {
    showError(input, 'Veuillez saisir un âge entier.');
  } else if (ageValue < 18) {
    showError(input, 'Vous devez avoir au moins 18 ans.');
  } else {
    showSuccess(input);
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} est requis`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} doit contenir au moins ${min} caractères`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} doit contenir moins de ${max} caractères`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Les mots de passe ne correspondent pas');
  }
}

// Get fieldname
function getFieldName(input) {
  const names = {
    username: 'Nom d\'utilisateur',
    email: 'Email',
    password: 'Mot de passe',
    password2: 'Confirmation du mot de passe',
    age: 'Âge'
  };

  return names[input.id] || input.id;
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const hasRequiredError = checkRequired([username, age, email, password, password2]);

  if (!hasRequiredError) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

  checkAge(age);
});
