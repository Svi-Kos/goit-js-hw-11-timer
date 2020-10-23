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
  const selectorEl = document.querySelector(`${selector}`);

  selectorEl.querySelector("span[data-value='days']").textContent = `${days}`;
  selectorEl.querySelector("span[data-value='hours']").textContent = `${hours}`;
  selectorEl.querySelector("span[data-value='mins']").textContent = `${mins}`;
  selectorEl.querySelector("span[data-value='secs']").textContent = `${secs}`;
}
