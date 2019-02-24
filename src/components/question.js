export class QuestionOrchestrator extends HTMLElement {
  constructor() {
    super();

    const styles = ``;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${styles}</style><div class="main">
    <slot name="question"></slot>
    <slot></slot>
    <button>Answer</button>
    </div>`;
    this.group = this.getAttribute('group');
    this.answers = Array.from(this.querySelectorAll('answer-option'));
    this.answers.forEach(answer =>
      answer.addEventListener(
        'answer-option-toggled',
        this.answerToggled.bind(this)
      )
    );
    shadowRoot
      .querySelector('button')
      .addEventListener('click', this.state.bind(this));
  }

  answerToggled(ev) {
    const details = ev.detail;
    console.log(
      `Fired: ${details.group}, value ${details.value} as ${details.selected}`
    );
  }

  state() {
    console.log(
      this.answers.map(a => {
        return {
          group: a.group,
          value: a.value,
          state: a.selected,
        };
      })
    );
  }
}

customElements.define('question-orchestrator', QuestionOrchestrator);
