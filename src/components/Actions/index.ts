import template from './index.pug';
import Block from '../../utils/block';
import add from '../../../static/icons/add.jpg';
import remove from '../../../static/icons/remove.jpg';
import Icon from '../icon/index';

interface IProps {
  events?: any
  show: boolean
}

export default class Actions extends Block {
  constructor(props?: IProps) {
    super('div', props);
  }

  init() {
    this.element.classList.add('actions');
    if (this.props.show) {
      this.element.classList.remove('hide');
    } else {
      this.element.classList.add('hide');
    }

    this.children.plus = new Icon({
      src: add,
    });

    this.children.remove = new Icon({
      src: remove,
    });
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.element.classList.remove('hide');
    } else {
      this.element.classList.add('hide');
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
