import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};


refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit (event) {
  event.preventDefault();
  const { delay, step, amount } = refs.form;

  if (delay.value < 0 || step.value < 0) {
    return Notify.warning(`Enter positive value, please!`)
  }

  setTimeout(() => {
    for (let i = 0; i < amount.value; i += 1) {
      createPromise(i + 1, step.value * i)
        .then(({ position, delay }) =>
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        )
        .catch(({ position, delay }) =>
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        );
    }
  }, delay.value);
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}