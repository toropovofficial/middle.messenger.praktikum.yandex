import EventBus from './eventBus';

type Meta = {
  tagName: string; props: Record<string, unknown>;
}

export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public children: Record<string, any>;

  protected props: P;

  private eventBus: any;

  private _element: HTMLElement | null = null;

  private _meta: Meta | null = null;

  public id = Math.random();

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(tagName = 'div', childrenAndProps = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(childrenAndProps);

    this._meta = {
      tagName,
      props,
    };
    this.children = children;

    this.props = this._makePropsProxy(props, this);

    this.eventBus = () => { return eventBus; };

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: Record<string, unknown>) {
    const props: Record<string, unknown> = {};
    const children: Record<string, unknown> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: any) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    if (!this._meta?.tagName) {
      return;
    }

    this._element = this._createDocumentElement(this._meta?.tagName);
  }

  _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => { return child.dispatchComponentDidMount(); });
  }

  _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    if (!oldProps && !newProps) {
      return false;
    }

    return true;
  }

  setProps = (nextProps: Record<string, unknown>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  protected compile(template: (context: Record<string, unknown>) =>
    string, context: Record<string, unknown>) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
    });

    let html = template(contextAndStubs);
    if (html.includes('<<')) {
      html = html.replaceAll('<<', '<');
    }

    if (html.includes('>>')) {
      html = html.replaceAll('>>', '>');
    }

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id='${component.id}']`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  get element() {
    return this._element as HTMLElement;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();

    if (typeof block === 'string') {
      this._element!.innerHTML = '';
    } else {
      const fragment = this.render();
      this._element!.innerHTML = '';

      if (fragment !== undefined) {
        this._element!.appendChild(fragment);
      }
    }

    this._addEvents();
  }

  public render() {}

  public getContent() {
    return this.element;
  }

  _makePropsProxy(props: Record<string, unknown>, context: any) {
    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: any) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: string) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-multi-assign
        const newValue = target[prop] = value;
        context.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newValue);

        return true;
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    if (this.getContent() !== null) {
      this.getContent()!.style.display = 'block';
    }
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
