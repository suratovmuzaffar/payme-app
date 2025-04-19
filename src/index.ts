import { loginInit } from './pages/login';
import { paymentInit } from './pages/payment';
import { registerInit } from './pages/register';

function addListeners() {
  const moviesLink = document.querySelector('#movies-link')!;
  const loginLink = document.querySelector('#login-link')!;
  const registerLink = document.querySelector('#register-link')!;

  moviesLink.addEventListener('click', paymentInit);
  loginLink.addEventListener('click', loginInit);
  registerLink.addEventListener('click', registerInit);
}

function init() {
  addListeners();
}

window.addEventListener('load', init);
