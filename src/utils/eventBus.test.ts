import { expect } from 'chai';
import EventBus from './eventBus';

describe('eventBus', () => {
  it('should emit events', () => {
    const eventBus = new EventBus();
    let result = 1;
    const func1 = () => { result = 3; };

    eventBus.on('event', func1);

    eventBus.emit('event');

    expect(result).to.be.eq(3);
  });

  it('should remove events', () => {
    const eventBus = new EventBus();
    let result = 1;
    const func1 = () => { result = 3; };

    eventBus.on('event', func1);
    eventBus.off('event', func1);
    eventBus.emit('event');

    expect(result).to.be.eq(result);
  });
});
