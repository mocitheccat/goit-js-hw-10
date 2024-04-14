import flatpickr from 'flatpickr';
import Toastify from 'toastify-js';

import 'flatpickr/dist/flatpickr.min.css';
import 'toastify-js/src/toastify.css';

const inputRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
btnStartRef.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]).getTime();
    if (userSelectedDate < Date.now()) {
      Toastify({
        text: 'Please choose a date in the future',
        duration: 3000,
        close: true,
        style: {
          background: 'linear-gradient(to right, #9c1a21, #fc030f)',
        },
      }).showToast();
      // alert('Please choose a date in the future');
      btnStartRef.disabled = true;
      return;
    } else {
      btnStartRef.disabled = false;
    }
  },
};

flatpickr(inputRef, options);

btnStartRef.addEventListener('click', () => {
  btnStartRef.disabled = true;
  inputRef.disabled = true;
  const currentTime = Date.now();
  let timeDifference = userSelectedDate - currentTime;

  const timerID = setInterval(() => {
    const currentTime = Date.now();
    timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerID);
      Toastify({
        text: 'Time is up',
        duration: 3000,
        close: true,
        style: {
          background: 'linear-gradient(to right, #03fc7b, #036916)',
        },
      }).showToast();
      inputRef.disabled = false;
      btnStartRef.disabled = false;
      updateTimer(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimer(days, hours, minutes, seconds);
    }
    // console.log(timerID);
    // console.log(timeDifference);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
