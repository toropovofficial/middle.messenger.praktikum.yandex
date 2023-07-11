import template from './index.pug';
import Block from '../../utils/block';
import Input from '../newInput/index';

interface IProps {
  label: string
}

export default class Checkbox extends Block {
  constructor(props: IProps) {
    super('label', props);
  }

  init() {
    this.element.classList.add('custom-checkbox');
    this.children.input = new Input({ name: 'checkbox', type: 'checkbox', value: '' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
