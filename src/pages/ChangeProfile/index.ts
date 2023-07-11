import template from './index.pug';
import Block from '../../utils/block';
import ProfileForm from '../../modules/newProfileForm/index';
import { profileFields } from '../SignIn/const';
import { initEventSubmit } from '../../utils/helpers';
import ProfileController from '../../controllers/ProfileController';
import AuthController from '../../controllers/AuthController';
import Avatar from '../../components/avatar/index';
import FileUploader from '../../components/FileUploader/index';
import image from '../../../static/icons/avatar.jpg';
import Modal from '../../components/modal/modal';
import { withStore, store } from '../../utils/Store';

class ChangeProfile extends Block {
  constructor(props: any) {
    super('section', props);
  }

  init() {
    this.element.classList.add('profile');
    this.children.avatar = new Avatar({
      src: image,
      events: {
        click: () => {
          store.set('showModal', true);
        },
      },
    });
    this.children.modal = new Modal({
      title: 'Загрузите файл',
      Content: FileUploader,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          if (document.getElementById('myUserForm')) {
            const myUserForm = document.getElementById('myUserForm') as HTMLFormElement;
            const form = new FormData(myUserForm);
            ProfileController.updateAvatar(form);
          }
        },
      },
    });
    this.children.form = new ProfileForm({
      updateProfile: true,
      ...profileFields,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const result = initEventSubmit(
            this.children.form.children,
            'profile',
          );
          if (result) {
            const { fields, isValid } = result;
            if (isValid) {
              ProfileController.update(fields);
              AuthController.fetchUser();
            } else {
              this.children.form.children.error.setProps({
                errorMessage: 'Не заполнены обязательные поля',
              });
              this.children.form.children.error.element.classList.remove('hide');
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Withuser = withStore((state) => {
  return { ...state.user };
});

export default Withuser(ChangeProfile);
