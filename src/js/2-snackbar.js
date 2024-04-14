import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();
  const delay = formRef.elements['delay'].value;
  let promiseState = formRef.elements['state'].value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve('Fulfilled');
      } else {
        reject('Rejected');
      }
    }, delay);
  });
  promise
    .then(result => {
      Toastify({
        text: `✅ ${result} promise in ${delay}ms`,
        duration: 3000,
        close: true,
        style: {
          background: 'linear-gradient(to right, #03fc7b, #036916)',
        },
      }).showToast();
    })
    .catch(error => {
      Toastify({
        text: `❌ ${error} promise in ${delay}ms`,
        duration: 3000,
        close: true,
        style: {
          background: 'linear-gradient(to right, #fc030f, #9c1a21)',
        },
      }).showToast();
    });
});
