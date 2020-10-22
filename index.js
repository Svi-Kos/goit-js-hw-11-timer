class CountdownTimer {
  constructor({ onTick, selector, targetDate }) {
    this.onTick = onTick;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const turgetDateUTC = this.targetDate.getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = turgetDateUTC - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    const selector = this.selector;

    return { days, hours, mins, secs, selector };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  onTick: updateTimer,
  selector: "#timer-1",
  targetDate: new Date("Nov 6, 2020"),
});

timer.start();

function updateTimer({ days, hours, mins, secs, selector }) {
  const refs = {
    daysEl: document
      .querySelector(`${selector}`)
      .querySelector("span[data-value='days']"),
    hoursEl: document
      .querySelector(`${selector}`)
      .querySelector("span[data-value='hours']"),
    minsEl: document
      .querySelector(`${selector}`)
      .querySelector("span[data-value='mins']"),
    secsEl: document
      .querySelector(`${selector}`)
      .querySelector("span[data-value='secs']"),
  };

  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minsEl.textContent = `${mins}`;
  refs.secsEl.textContent = `${secs}`;
}
