import template from './index.pug';
import Block from '../../utils/block';
import tabs from './const';
import Tab from '../../components/tab/index';

export default class Tabs extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    this.element.classList.add('tabs');
    tabs.forEach((item) => {
      this.children[item.name] = new Tab(item);
    });
  }

  render() {
    return this.compile(template, {});
  }
}
