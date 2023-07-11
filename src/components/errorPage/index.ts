import template from './index.pug';
import Block from '../../utils/block';

interface IProps {
  error: string | number
  notification?: string
  linkHref?: string
  linkText?: string
}

export default class ErrorPage extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  init() {
    this.element.classList.add('error__wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}
