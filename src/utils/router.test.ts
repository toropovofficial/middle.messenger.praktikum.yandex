import { expect } from 'chai';
import sinon from 'sinon';
import Route from './Router';

describe('Router', () => {
  const content = sinon.fake.returns(document.createElement('div'))();
  const blockMock = class {
    getContent() {
      return content;
    }
  };

  it('should create route', () => {
    const signIn = 'sign-in';
    const router = new Route('#app');

    router.use(signIn, blockMock);

    expect(router.routes.length).to.be.eq(1);
  });

  it('should change pathName after router go', () => {
    const signIn = '/sign-in';
    const router = new Route('#app');

    router.use(signIn, blockMock);
    router.use('/sign-up', blockMock);
    router.start();
    router.go(signIn);

    expect(router._currentRoute._pathname).to.be.eq(signIn);
  });
});
