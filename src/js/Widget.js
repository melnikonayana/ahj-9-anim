export default class Widget {
  constructor() {
    this.container = document.getElementById('widget');
    this.addTicket = this.addTicket.bind(this);
    this.elem = null;
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.classList.add('widget-container');
    widget.innerHTML = `
    <div class="list"></div>
    <div class="footer">
      <form class="form">
        <input class="form-input" name="input" type="text">
      </form>
    </div>
            `;

    this.container.appendChild(widget);

    document.querySelector('.form').addEventListener('submit', this.addTicket);
  }

  addTicket(event) {
    event.preventDefault();
    this.elem = document.createElement('span');
    this.elem.textContent = event.target.input.value;
    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.showTicket(latitude.toFixed(5), longitude.toFixed(5));
        },
        (error) => {
          this.showModal();
          console.error(error);
        },
      );
    }
  }

  resetInput() {
    this.container.querySelector('.form-input').value = '';
  }

  showTicket(latitude, longitude) {
    const lilst = document.querySelector('.list');
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.innerHTML = `
       <div class="elem"></div>
       <div class="date">${new Date().toLocaleString()}</div>
       <div class="geo">[${latitude},${longitude}]</div>
    `;
    lilst.insertAdjacentElement('afterbegin', ticket);
    this.container
      .querySelector('.elem')
      .insertAdjacentElement('afterbegin', this.elem);
    this.resetInput();
  }

  showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-text">Что-то пошло не так  
      <p>Извините, но мы не можем определить ваше местоположение, 
      пожалуйста, дайте нам разрешение на использование геолокации 
      либо введите координаты вручную
      </p>
      <p>Широта и долгота через запятую</p>
      <form class="modal-form">
        <input class="modal-input" name="modal" type="text">
        <div class="buttons">
        <button type="reset" class="reset">Отмена</button>
        <button type="submit" class="ok">Ok</button>
        </div>
      </form>
      </div>
    `;
    this.container.querySelector('.widget-container').appendChild(modal);

    this.container
      .querySelector('.modal-input')
      .addEventListener('input', this.deleteError);
    this.container
      .querySelector('.modal-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        let value = this.checkValidity(event.target.modal.value);
        console.log(value);
        if (value) {
          value = value[0].split(',');
          const latitude = value[0].trim();
          const longitude = value[1].trim();

          this.hideModal();
          this.showTicket(latitude, longitude);
        } else {
          alert('Координаты введены не верно');
        }
      });

    this.container
      .querySelector('.modal-form')
      .addEventListener('reset', (event) => {
        event.preventDefault();
        this.hideModal();
      });
  }

  hideModal() {
    this.container.querySelector('.modal').remove();
    this.resetInput();
  }

  /* eslint-disable */
  checkValidity(string) {
    console.log(string);
    return string.match(/^\[?\d+\.\d+,\s?\-?\d+\.\d+\]?$/gm);
  }


}
