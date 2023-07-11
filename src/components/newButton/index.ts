import template from './index.pug';
import Block from '../../utils/block';

interface IProps {
  label: string
  type?: string
  click?: () => void
}

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }

  init() {
    this.element.classList.add('button');
    this.element.setAttribute('type', this.props.type);
  }

  render() {
    return this.compile(template, this.props);
  }
}
