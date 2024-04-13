import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputRef = document.querySelector("#datetime-picker");
let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]).getTime();
  },
};

flatpickr(inputRef, options);

const btnStartRef = document.querySelector("[data-start]");

btnStartRef.addEventListener("click", () => {
  if (!userSelectedDate) {
    alert("Please select a date first.");
    return;
  }

  btnStartRef.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      alert("Countdown finished!");
      btnStartRef.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
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
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}
