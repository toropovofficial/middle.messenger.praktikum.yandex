import Block from '../../utils/block';
import template from './index.pug';
import { withStore } from '../../utils/Store';

class Messages extends Block {
  constructor(props: any) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('messages');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const WithMessages = withStore((state) => {
  return { messages: state.messages, id: state.user?.data?.id };
});

export default WithMessages(Messages);
