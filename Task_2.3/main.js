class Validator {

  constructor (email, date) {
    this.email = email
    this.date = date
  }

  isEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegExp.test(email);
  }

  isDate(date) {
    var dateRegExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return dateRegExp.test(date);
  }

  isRequired(data){
    if (!data || data == ""){
      return false;
    }
    else{
      return true;
    }
  }

}

const form  = document.getElementsByTagName('form')[0];
let errors = document.querySelectorAll('.error');

let validator = new Validator();

form.addEventListener('submit', function (event) {
  removeError(errors);
  if(!validator.isEmail(document.getElementById('email').value)) {
    showError('.error.email');
    event.preventDefault();
  }
  if(!validator.isRequired(document.getElementById('firstName').value)) {
    showError('.error.firstName');
    event.preventDefault();
  }
  if(!validator.isRequired(document.getElementById('password').value)) {
    showError('.error.password');
    event.preventDefault();
  }
  if(!validator.isRequired(document.getElementById('confirmPassword').value)) {
    showError('.error.confirmPassword');
    event.preventDefault();
  }
});

function showError(elementClass) {
  let error = document.querySelector(elementClass);
  error.classList.add('active');
}

function removeError(element) {
  element.forEach((el) => {
    if (el.classList.contains('active')){
      el.classList.remove('active')
    }
  })
}