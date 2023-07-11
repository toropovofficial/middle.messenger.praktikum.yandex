import { User } from '../api/AuthApi';
import EventBus from './eventBus';
import { set } from './helpers';
import { IMessage, IChat, IActiveChat } from './interfaces';

export enum StoreEvents {
  Updated = 'Updated',
}

type State = {
  user: {
    data: null | User;
    isLoading: boolean;
    hasError: boolean;
  };
  activeChat: IActiveChat;
  chats: IChat[];
  token: string;
  messages: IMessage[];
  showModal: boolean;
};

const initialState: State = {
  user: {
    data: null,
    isLoading: true,
    hasError: false,
  },
  activeChat: {
    avatar: null,
    created_by: 0,
    id: 0,
    last_message: {
      content: '',
      id: 0,
      time: '',
      user: {
        avatar: '',
        display_name: '',
        email: '',
        first_name: '',
        login: '',
        phone: '',
        second_name: '',
        id: 0,
      },
    },
    title: '',
    unread_count: 0,
  },
  chats: [],
  messages: [],
  token: '',
  showModal: false,
};

class Store extends EventBus {
  public state = initialState;

  constructor() {
    super('');
  }

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    try {
      this.emit(StoreEvents.Updated, this.state);
    } catch (error) {
    }
  }

  public getState() {
    return this.state;
  }

  public getActiveChat() {
    return this.state.activeChat;
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: any) => {
    return class WithStore extends Component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, (newState: any) => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    };
  };
};

export { store };
