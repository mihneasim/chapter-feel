export class AnswerOption extends HTMLElement {
  constructor() {
    super();

    const styles = `
    :host {
      display: inline-block;
      cursor: pointer;
    }
    .main{
      border-radius: 4px;
      background-color: #999;
      color: #fff;
      padding: 4px;
    }
    .main:hover{
      background-color: #666;
    }
    .main.selected {
      background-color: #000;
    }
    `;

    this.selected = false;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${styles}</style><div class="main">Hello</div>`;
    this.buttonDiv = shadowRoot.querySelector('.main');
    this.buttonDiv.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.selected ? this.deselectOption() : this.selectOption();
  }

  selectOption() {
    this.buttonDiv.classList.add('selected');
    this.selected = true;
  }

  deselectOption() {
    this.buttonDiv.classList.remove('selected');
    this.selected = false;
  }
}

customElements.define('answer-option', AnswerOption);
