import template from './index.pug';
import Block from '../../utils/block';
import { withStore, store } from '../../utils/Store';
import Icon from '../icon/index';
import close from '../../../static/icons/close.png';

interface IProps {
  title: string
  Content: any
  showModal: boolean
  events: any
}

class Modal extends Block {
  constructor(props: IProps) {
    super('section', props);
  }

  init() {
    this.children.content = new this.props.Content();
    this.children.close = new Icon({
      src: close,
      events: {
        click: () => {
          store.set('showModal', false);
        },
      },
    });
  }

  render() {
    const pathname = $router._currentRoute?._pathname;
    const showCloseIcon = !(pathname === '/sign-in' || pathname === '/sign-up');

    return this.compile(template, { ...this.props, showCloseIcon });
  }
}
const WithModal = withStore((state) => {
  return { showModal: state.showModal };
});

export default WithModal(Modal);
