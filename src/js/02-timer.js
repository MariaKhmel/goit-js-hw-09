import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
input: document.querySelector('#datetime-picker'),
startBtn: document.querySelector('[data-start]'),   
secondsEl : document.querySelector ('[data-seconds]'),
minutesEl : document.querySelector ('[data-minutes]'),
hoursEl : document.querySelector ('[data-hours]'),
daysEl : document.querySelector ('[data-days]'),

}

  refs.startBtn.disabled = true; 


const options = {
  enableTime: true,
    time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
console.log(selectedDates[0]);
if (selectedDates[0] - Date.now() < 0) {
  return Notify.warning('Please choose a date in the future', {
            timeout: 3000,
          },)
      }
       refs.startBtn.disabled = false;
  },
};

const fp = flatpickr(refs.input, options); 


///timer

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


refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
const timer = setInterval(() => {
    markup(convertMs(Date.parse(refs.input.value) - Date.now()));
    
        if (Date.parse(refs.input.value) - Date.now() < 999) {
            clearInterval(timer);
          }
    }, 1000)
}

function addLeadingZero(value) {
 return String(value).padStart(2, '0');    
}

function markup({ days, hours, minutes, seconds }) {
    refs.secondsEl.textContent = addLeadingZero(seconds);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.daysEl.textContent = addLeadingZero(days);
  }

  