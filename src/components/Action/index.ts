import template from './index.pug';
import Block from '../../utils/block';
import Button from '../newButton/index';
import Input from '../newInput/index';

interface IProps {
  text: string;
  events: any;
}
export default class Action extends Block {
  constructor(props: IProps) {
    super('form', props);
  }

  init() {
    this.children.input = new Input({
      name: 'user-name', type: 'text', placeholder: 'Введите данные', value: '',
    });

    this.children.buttonSubmit = new Button({
      label: 'сохранить',
      type: 'submit',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
