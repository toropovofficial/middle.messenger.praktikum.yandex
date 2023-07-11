import template from './index.pug';
import Block from '../../utils/block';
import Input from '../../components/newInput/index';
import Icon from '../../components/newIcon/index';
import ErrorMessage from '../../components/error/index';
import validation from '../../utils/validation';
import { IInputItem } from '../../pages/interfaces/index';

export default class Field extends Block {
  constructor(props: IInputItem) {
    super('div', props);
  }

  init() {
    this.element.classList.add('field-wrapper');
    this.children.Icon = new Icon();
    this.children.error = new ErrorMessage({});
    this.children.Input = new Input(
      {
        value: this.props.value,
        name: this.props.name,
        type: this.props.type,
        placeholder: this.props.placeholder,
        events: {
          blur: (e: Event) => {
            const { value } = e.target as HTMLInputElement;
            const { name } = e.target as HTMLInputElement;

            if (!value) {
              return;
            }
            const res = validation(value, name);
            if (!res.status) {
              this.children.error.setProps({ errorMessage: res.message });
              this.element!.querySelector('.error')?.classList.remove('hide');
            } else {
              this.element!.querySelector('.error')?.classList.add('hide');
            }
          },
          focus: (e: Event) => {
            const { value } = e.target as HTMLInputElement;
            const { name } = e.target as HTMLInputElement;

            if (value === '' || value === undefined || !name) {
              return;
            }

            const res = validation(value, name);
            if (!res.status) {
              this.children.error.setProps({ errorMessage: res.message });
              this.element!.querySelector('.error')?.classList.remove('hide');
            } else {
              this.element!.querySelector('.error')?.classList.add('hide');
            }
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
