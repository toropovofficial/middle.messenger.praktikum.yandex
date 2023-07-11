import template from './index.pug';
import Block from '../../utils/block';

interface IProps {
  name: string;
  value?: string;
  type?: string;
  class?: string;
  placeholder?: string;
  disabled?: boolean;
  events?: {
    blur: (e: Event) => void;
    focus: (e: Event) => void;
  };
}

export default class Input extends Block {
  constructor(props: IProps) {
    super('input', props);
  }

  init() {
    this.element.classList.add('input');
    (this.element as HTMLInputElement).value = this.props.value;
    this.element.setAttribute('name', this.props.name);
    this.element.setAttribute('type', this.props.type);
    this.element.setAttribute('placeholder', this.props.placeholder);
    if (this.props.disabled) {
      this.element.setAttribute('disabled', this.props.disabled);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
