// eslint-disable-next-line import/no-extraneous-dependencies
import sanitizeHtml from 'sanitize-html';
import template from './index.pug';
import Block from '../../utils/block';
import User from '../../components/user/index';
import Tabs from '../../modules/tabs/index';
import Chat from '../../modules/Chat/index';
import Search from '../../components/search/index';
import Actions from '../../components/Actions/index';
import Action from '../../components/Action/index';
import { store } from '../../utils/Store';
import Modal from '../../components/modal/modal';
import ChatsList from '../../modules/Chats/index';
import ChatController from '../../controllers/ChatController';
import { IActiveChat, IChat } from '../../utils/interfaces';

export default class MessengerPage extends Block {
  constructor() {
    super('section', {});
  }

  init() {
    if (this.element) {
      this.element.classList.add('chats');
    }
    const { chats } = store.state;
    let activeChat: IChat | null | undefined = null;

    let showActionsModal = false;
    let actionsModalTitle = 'Добавить чат';

    this.children.user = new User({
      name: 'alex',
      message: 'Онлайн',
      count: 4,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLFormElement;
          if (!(target.tagName === 'IMG')) {
            return;
          }
          if (target.parentElement?.parentElement?.classList.contains('add__btn')) {
            store.set('showModal', true);
            actionsModalTitle = 'Добавить чат';

            this.children.chatModal.setProps({ title: actionsModalTitle });
          } else if (target.parentElement?.parentElement?.classList.contains('remove__btn')) {
            store.set('showModal', true);
            actionsModalTitle = 'Удалить чат';
            this.children.chatModal.setProps({ title: actionsModalTitle });
          }
        },
      },
    });

    this.children.tabs = new Tabs();

    this.children.search = new Search({ placeholder: 'Поиск' });

    this.children.chats = new ChatsList({
      chats,
      events: {
        click: async (e: Event) => {
          const target = e.target as HTMLInputElement;
          const id = target.getAttribute('id');

          if (!id) {
            return;
          }

          const { chats } = store.state;
          activeChat = chats.find((item: IChat) => { return item.id === +id; });
          if (activeChat) {
            store.set('activeChat', activeChat);
            await ChatController.connectionChat(activeChat.id);
          }
        },
      },
    });

    this.children.chatModal = new Modal({
      title: actionsModalTitle,
      Content: Action,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const formData = new FormData(target);
          const name: FormDataEntryValue | null | any = formData.get('user-name');
          const safeName = sanitizeHtml(name);
          if (actionsModalTitle === 'Добавить чат') {
            if (safeName && typeof safeName === 'string') {
              ChatController.create({ title: safeName });
            }
          }

          if (actionsModalTitle === 'Удалить чат') {
            ChatController.deleteChat({ chatId: +safeName });
          }

          if (actionsModalTitle === 'Добавить пользователя') {
            ChatController.addUserToChat({
              users: [
                +safeName,
              ],
              chatId: store.state.activeChat.id,
            });
          }

          if (actionsModalTitle === 'Удалить пользователя') {
            ChatController.removeUserToChat({
              users: [
                +safeName,
              ],
              chatId: store.state.activeChat.id,
            });
          }

          store.set('showModal', false);
        },
      },
    });

    this.children.actionsModal = new Actions({
      show: showActionsModal,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (target.classList.contains('add') || target.parentElement?.parentElement?.classList.contains('add')) {
            store.set('showModal', true);
            actionsModalTitle = 'Добавить пользователя';

            this.children.chatModal.setProps({ title: actionsModalTitle });
          } else {
            store.set('showModal', true);
            actionsModalTitle = 'Удалить пользователя';
            this.children.chatModal.setProps({ title: actionsModalTitle });
          }
          showActionsModal = !showActionsModal;
          this.children.actionsModal.setProps({ show: showActionsModal });
        },
      },
    });

    this.children.chat = new Chat({});

    this.children.activeUserInfo = new User({
      title: (activeChat as unknown as IActiveChat)?.title,
      message: '',
      count: 4,
      isActive: true,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLFormElement;
          if (
            target.tagName === 'IMG' && !target.parentElement?.classList.contains('avatar')
          ) {
            showActionsModal = !showActionsModal;
            this.children.actionsModal.setProps({ show: showActionsModal });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
