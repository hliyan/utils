import EventEmitter from 'eventemitter3';

export default class Client {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  addEventListener(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  removeEventListener(eventName, listener) {
    this.eventEmitter.removeListener(eventName, listener);
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, {eventName, data});
  }

  emitError(eventName, error) {
    this.eventEmitter.emit(eventName, {eventName, error});
  }
}

