import Block from '../../utils/block';

export default class Icon extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    this.element?.classList.add('icon');
  }

  render() {
    return this.compile((() => { return ''; }), {});
  }
}
