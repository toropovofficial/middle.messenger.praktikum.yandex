import template from './index.pug';
import Block from '../../utils/block';
import Input from '../../components/newInput/index';
import ErrorMessage from '../../components/error/index';
import validation from '../../utils/validation';
import { IInputItem } from '../../pages/interfaces/index';

export default class Field extends Block {
  constructor(props: IInputItem) {
    super('div', props);
  }

  init() {
    this.children.Input = new Input(
      {
        value: this.props.value,
        name: this.props.name,
        type: this.props.type,
        placeholder: this.props.placeholder,
        events: {
          blur: (e: { target: { value?: string; name?: string; }; }) => {
            const { value } = e.target;
            const { name } = e.target;

            if (!value || !name) {
              return;
            }

            const res = validation(value, name);

            if (!res.status) {
              this.children.error.setProps({ errorMessage: res.message });
              this.element.querySelector('.error')?.classList.remove('hide');
            } else {
              this.element.querySelector('.error')?.classList.add('hide');
            }
          },
          focus: (e: { target: { value?: string; name?: string; }; }) => {
            const { value } = e.target;
            const { name } = e.target;

            if (value === '' || value === undefined || !name) {
              return;
            }

            const res = validation(value, name);

            if (!res.status) {
              this.children.error.setProps({ errorMessage: res.message });
              this.element.querySelector('.error')?.classList.remove('hide');
            } else {
              this.element.querySelector('.error')?.classList.add('hide');
            }
          },
        },
      },
    );
    this.children.error = new ErrorMessage({ errorMessage: 'error' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
