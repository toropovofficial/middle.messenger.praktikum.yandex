const isEqual = (lhs: any, rhs: any) => {
  return lhs === rhs;
};

function render(query: any, block: { getContent: () => any }) {
  const root = document.querySelector(query);
  root.innerText = '';

  root.append(block.getContent());
  return root;
}

export default class Route {
  _pathname: any;

  _blockClass: any;

  _block: any;

  _props: any;

  constructor(pathname: any, view: any, props: { rootQuery: any }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    const root = document.querySelector(this._props.rootQuery);

    root.innerText = '';
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}
