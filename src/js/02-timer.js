import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
// const clearBtn = document.querySelector('[data-clear]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

// startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// startBtn.addEventListener('click', timerStart);
// clearBtn.addEventListener('click', timerClear);

// clearBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

let timerInterval;

function timer() {
  startBtn.removeEventListener('click', timer);

  const selectedDate = new Date(inputEl.value);

  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = selectedDate.getTime() - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);

    if (
      dataDays.textContent == `00` &&
      dataHours.textContent == `00` &&
      dataMinutes.textContent == `00` &&
      dataSeconds.textContent == `00`
    ) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startBtn.addEventListener(`click`, timer);
