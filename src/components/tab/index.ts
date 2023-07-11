import template from './index.pug';
import Block from '../../utils/block';

interface ITab {
  name?: string
  text: string
  src?: string
  alt?: string
}

export default class Tab extends Block {
  constructor(props: ITab) {
    super('div', props);
  }

  init() {
    this.element.classList.add('tab');
  }

  render() {
    return this.compile(template, this.props);
  }
}
