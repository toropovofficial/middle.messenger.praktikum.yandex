import template from './index.pug';
import Block from '../../utils/block';
import Input from '../../components/newInput/index';
import BreadCrumbs from '../../components/breadCrumbs/index';
import { profileFields } from '../SignIn/const';
import Avatar from '../../components/avatar/index';
import { IInputItem } from '../interfaces/index';
import image from '../../../static/icons/avatar.jpg';
import Link from '../../components/link/index';
import { store } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';

interface IProps {
  list: IInputItem[];
  view?: boolean;
}

class Profile extends Block {
  constructor(props: IProps) {
    super('section', props);
  }

  init(): void {
    const { user } = store.getState();

    this.children.breadCrumbs = new BreadCrumbs({});

    this.children.avatar = new Avatar({ src: image });
    if (Array.isArray(this.props?.list)) {
      this.props.list.forEach((item: IInputItem) => {
        if (user.data && user.data[item.name]) {
          item.value = user.data[item.name];
        }
        this.children[item.name] = new Input({ ...item, disabled: true });
      });
    }

    this.children.input = new Input({
      name: 'login',
      value: '',
      placeholder: 'login',
    });

    this.children.changeDataLink = new Link({
      text: 'Изменить данные',
      events: {
        click: () => {
          $router.go('/settings');
        },
      },
    });

    this.children.changePasswordLink = new Link({
      text: 'Изменить пароль',
      events: {
        click: () => {
          $router.go('/settings/password');
        },
      },
    });

    this.children.homelink = new Link({
      text: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render() {
    const { user } = store.getState();
    return this.compile(template, { ...this.props, name: user?.data?.first_name });
  }
}

export default class ProfilePage {
  getContent() {
    const viewProfilePage = new Profile({ ...profileFields, view: true });
    return viewProfilePage.element;
  }
}
