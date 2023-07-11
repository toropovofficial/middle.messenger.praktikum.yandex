import template from './index.pug';
import Block from '../../utils/block';
import { withStore, store } from '../../utils/Store';
import Input from '../../components/newInput/index';
import Icon from '../../components/icon/index';
import arrow from '../../../static/icons/arrow.jpg';
import Messages from '../../components/messages/index';

class Chat extends Block {
  [x: string]: any;

  constructor(props: any) {
    super('div', props);
  }

  init() {
    this.element.classList.add('chat');
    this.children.messages = new Messages({ messages: store.state.messages });
    this.children.input = new Input({
      name: 'user-name', type: 'text', placeholder: 'Сообщение', value: '',
    });
    this.children.buttonSubmit = new Icon({
      src: arrow,
      events: {
        click: () => {
          if (!this.socket) {
            return;
          }

          const message = this.children.input.element.value;
          if (!message) {
            return;
          }

          this.socket.send(JSON.stringify({
            content: message,
            type: 'message',
          }));
        },
      },
    });
  }

  componentDidUpdate(props: Record<string, unknown>, newProps: Record<string, unknown>) {
    const userId = store.state.user.data?.id;
    const chatId = store.state.activeChat.id;
    const token = newProps && props.token !== newProps ? newProps : '';

    if (token && chatId && userId) {
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      this.socket.addEventListener('open', () => {
        this.socket.send(JSON.stringify({
          content: '0',
          type: 'get old',
        }));
      });

      this.socket.onmessage = (event: any) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            store.set('messages', data);
          } else {
            const { messages } = store.state;
            messages.push(data);
            store.set('messages', messages);
          }
        } catch (error) {
          console.error(error);
        }
      };
    }

    return true;
  }

  render() {
    // console.log(this.props)
    return this.compile(template, this.props);
  }
}

const WithChat = withStore((state) => {
  return { token: state.token };
});

export default WithChat(Chat);
