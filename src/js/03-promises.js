import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

const formEl = document.querySelector(`.form`);

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener(`click`, event => {
  event.preventDefault();

  let delay = Number(delayEl.value);

  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i++) {
    setTimeout(delay => {
      createPromise(i, delay)
        .then(msgAccess => {
          Notify.success(msgAccess);
        })
        .catch(msgRejected => {
          Notify.failure(msgRejected);
        });
    }, delay);
    delay += step;
  }
});
