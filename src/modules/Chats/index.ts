import template from './index.pug';
import Block from '../../utils/block';
import { withStore } from '../../utils/Store';
import image from '../../../static/icons/avatar.jpg';

class Chats extends Block {
  constructor(props: any) {
    super('div', props);
  }

  init() {
    this.element.classList.add('Chats');
  }

  render() {
    return this.compile(template, { ...this.props, src: image });
  }
}

const WithChats = withStore((state) => {
  return { chats: state.chats };
});

export default WithChats(Chats);
