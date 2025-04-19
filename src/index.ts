import { loginInit } from './pages/login';
import { paymentInit } from './pages/payment';
import { registerInit } from './pages/register';

function addListeners() {
  const PaymentLink = document.querySelector('#payment-link')!;
  const loginLink = document.querySelector('#login-link')!;
  const registerLink = document.querySelector('#register-link')!;

  PaymentLink.addEventListener('click', paymentInit);
  loginLink.addEventListener('click', loginInit);
  registerLink.addEventListener('click', registerInit);
}

function init() {
  addListeners();
}

window.addEventListener('load', init);
