import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('[id="datetime-picker"]');
const secondsEl = document.querySelector ('[data-seconds]');
const minutesEl = document.querySelector ('[data-minutes]');
const hoursEl = document.querySelector ('[data-hours]');
const daysEl = document.querySelector ('[data-days]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] - Date.now() < 0) {
        return Notify.warning('Please choose a date in the future', {
            timeout: 3000,
          },)
      };
      startBtn.disabled = false;
    },
  };

  flatpickr(inputEl, options);
startBtn.disabled = true;

//   events
startBtn.addEventListener('click', onStartBtnClick)

// functions
function onStartBtnClick () {
    startBtn.disabled = true;
    
    const timer = setInterval(() => {
        markup(convertMs(Date.parse(inputEl.value) - Date.now()));
        if (Date.parse(inputEl.value) - Date.now() < 999) {
            clearInterval(timer);
          }
    }, 1000)
}

function markup({ days, hours, minutes, seconds }) {
    secondsEl.textContent = addLeadingZero(seconds);
    minutesEl.textContent = addLeadingZero(minutes);
    hoursEl.textContent = addLeadingZero(hours);
    daysEl.textContent = addLeadingZero(days);
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
  };
  
  function addLeadingZero (value) {
    return String(value).padStart(2, '0');
  }