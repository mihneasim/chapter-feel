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
    shadowRoot.innerHTML = `<style>${styles}</style><div class="main"><slot></slot></div>`;
    this.buttonDiv = shadowRoot.querySelector('.main');
    this.buttonDiv.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    const status = this.selected ? this.deselectOption() : this.selectOption();
    const group = this.getAttribute('group');
    const value = this.getAttribute('value');
    this.dispatchEvent(
      new CustomEvent('answer-option-toggled', {
        detail: {
          group,
          value,
          status,
        },
      })
    );
  }

  selectOption() {
    this.buttonDiv.classList.add('selected');
    return (this.selected = true);
  }

  deselectOption() {
    this.buttonDiv.classList.remove('selected');
    return (this.selected = false);
  }
}

customElements.define('answer-option', AnswerOption);
