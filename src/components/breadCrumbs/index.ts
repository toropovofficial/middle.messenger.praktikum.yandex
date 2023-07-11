import template from './index.pug';
import Block from '../../utils/block';
import Icon from '../icon/index';
import image from '../../../static/icons/leftArrow.png';
import { withStore } from '../../utils/Store';

interface IProps {
  text?: string;
  events: {
    click: () => void;
  };
}

class BreadCrumbs extends Block {
  constructor(props: IProps) {
    super('aside', props);
  }

  init() {
    this.element.classList.add('breadcrumbs');

    this.children.link = new Icon({
      src: image,
      events: {
        click: () => {
          $router.go('/messenger');
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

export default Withuser(BreadCrumbs);
