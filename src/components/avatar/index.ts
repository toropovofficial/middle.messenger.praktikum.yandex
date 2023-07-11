import template from './index.pug';
import Block from '../../utils/block';
import { withStore } from '../../utils/Store';

interface IProps {
  src?: string
  alt?: string
}

class Avatar extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  init() {
    this.element.classList.add('avatar');

    if (!this.props.src) {
      this.element.classList.add('empty');
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Withuser = withStore((state) => {
  return { ...state.user };
});

export default Withuser(Avatar);
