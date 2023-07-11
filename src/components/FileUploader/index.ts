import template from './index.pug';
import Block from '../../utils/block';
import Button from '../newButton/index';

interface IProps {
  text: string;
  events: any;
}
export default class Upload extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  init() {
    this.children.buttonSubmit = new Button({
      label: 'сохранить',
      type: 'submit',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
