import template from './index.pug';
import Block from '../../utils/block';
import Field from '../fieldNew/index';
import Button from '../../components/newButton/index';
import ErrorMessage from '../../components/error/index';
import Checkbox from '../../components/checkboxNew/index';
import { IInputItem } from '../../pages/interfaces/index';
import Link from '../../components/link/index';
import { withStore } from '../../utils/Store';

interface IProps {
  label: string
  isLogin: boolean,
  list: IInputItem[],
  events: any
}

class Form extends Block {
  constructor(props: IProps) {
    super('form', props);
  }

  init() {
    if (Array.isArray(this.props?.list)) {
      this.props.list.forEach((item: IInputItem) => {
        const name = item.name as string;
        if (name !== undefined || name !== null) {
          this.children[name as keyof IInputItem] = new Field(item);
        }
      });
    }

    this.children.checkbox = new Checkbox({ label: 'Запомнить меня' });

    this.children.error = new ErrorMessage({});

    this.children.buttonSubmit = new Button({ label: this.props.label, type: 'submit' });

    this.children.loginLink = new Link({
      text: 'Войти',
      events: {
        click: () => {
          $router.go('/sign-in');
        },
      },
    });

    this.children.RegistrationLink = new Link({
      text: 'Создать аккаунт',
      events: {
        click: () => {
          $router.go('/sign-up');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withForm = withStore((state) => { return { ...state.user }; });

export default withForm(Form);
