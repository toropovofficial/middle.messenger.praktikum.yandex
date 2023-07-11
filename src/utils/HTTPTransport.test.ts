import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';
// import sinon from 'sinon';
// import Route from './Router';

describe('HTTPTransport', () => {
  it('should start class HTTPTransport and added endpoint', () => {
    const path = '/test';
    class HTTPTransportClone extends HTTPTransport {
      constructor(props: string) {
        super(props);
      }
    }

    const BaseAPI = new HTTPTransportClone('/test');

    expect(BaseAPI.endpoint).to.be.includes(path);
  });

  it('should be get, post, delete, put methods in the class', () => {
    class HTTPTransportClone extends HTTPTransport {
      constructor(props: string) {
        super(props);
      }
    }

    const BaseAPI = new HTTPTransportClone('/test');

    expect(typeof BaseAPI.get === 'function').to.be.true;
    expect(typeof BaseAPI.post === 'function').to.be.true;
    expect(typeof BaseAPI.delete === 'function').to.be.true;
    expect(typeof BaseAPI.put === 'function').to.be.true;
  });
});
