import { expect } from 'chai';
import Block from './block';

describe('block', () => {
  it('should create wrapper element', () => {
    const wrapperTag = 'form';
    class BlockMock extends Block {
      constructor(props: any) {
        super(wrapperTag, props);
      }

      render() {
        return this.compile(() => { return ''; }, this.props);
      }
    }

    const page = new BlockMock({ title: 'title' });
    const tag = page.getContent();

    expect(tag.tagName).to.be.eq('FORM');
  });

  it('should added children', () => {
    const wrapperTag = 'form';
    class ChildMock extends Block {}
    class BlockMock extends Block {
      constructor(props: any) {
        super(wrapperTag, props);
      }

      init() {
        this.children.child = new ChildMock();
      }

      render() {
        return this.compile(() => { return ''; }, this.props);
      }
    }
    const page = new BlockMock({ title: 'title' });

    expect(Boolean(page.children.child.id)).to.be.true;
  });

  it('should added children', () => {
    const wrapperTag = 'form';
    class ChildMock extends Block {}
    class BlockMock extends Block {
      constructor(props: any) {
        super(wrapperTag, props);
      }

      init() {
        this.children.child = new ChildMock();
      }

      render() {
        return this.compile(() => { return ''; }, this.props);
      }
    }
    const page = new BlockMock({ title: 'title' });

    expect(Boolean(page.children.child.id)).to.be.true;
  });
});
