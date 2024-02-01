import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const key = 'feedback-form-state';

const saveFormToLocalStorage = () => {
  const formInputs = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(key, JSON.stringify(formInputs));
};

form.addEventListener('input', throttle(saveFormToLocalStorage, 500));

window.addEventListener('load', () => {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email;
    messageInput.value = message;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formInputs = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.removeItem(key);
  console.log('Form Inputs:', formInputs);
  form.reset();
});