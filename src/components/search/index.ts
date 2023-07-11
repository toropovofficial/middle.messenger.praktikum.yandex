import template from './index.pug';
import Block from '../../utils/block';

interface IProps {
  placeholder: string
}

export default class Search extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  init() {
    this.element.classList.add('search');
  }

  render() {
    return this.compile(template, this.props);
  }
}
