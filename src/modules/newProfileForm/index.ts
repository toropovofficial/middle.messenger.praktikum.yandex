import template from './index.pug';
import Block from '../../utils/block';
import FieldNew from '../profileField/index';
import Button from '../../components/newButton/index';
import ErrorMessage from '../../components/error/index';
import { IInputItem } from '../../pages/interfaces/index';
import { store } from '../../utils/Store';

interface IProps {
  list: IInputItem[]
  changePassword?: boolean
  updateProfile? : boolean
  events: any
}

export default class profileForm extends Block {
  constructor(props: IProps) {
    super('form', props);
  }

  init(): void {
    const { user } = store.getState();

    if (Array.isArray(this.props?.list)) {
      this.props.list.forEach((item: IInputItem) => {
        if (user.data && user.data[item.name]) {
          item.value = user.data[item.name];
        }
        const name = item.name as string;
        this.children[name as keyof IInputItem] = new FieldNew(item);
      });
    }

    this.children.saveButton = new Button({ label: 'save', type: 'submit' });
    this.children.error = new ErrorMessage({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
