import Client from '../src/client';

class MyClient extends Client {
}

MyClient.events = {FOO: 'FOO', BAR: 'BAR'};

let client = new MyClient();

test('should emit events', (done) => {
  const onFoo = (e) => {
    expect(e.eventName).toBe(MyClient.events.FOO);
    expect(e.data).toEqual('Hello');
    expect(e.error).toBeUndefined();
    done();
  };

  client.addEventListener(MyClient.events.FOO, onFoo);
  client.emit(MyClient.events.FOO, 'Hello');
  client.removeEventListener(MyClient.events.FOO, onFoo);
});

test('should emit errors', (done) => {
  const onFoo = (e) => {
    expect(e.eventName).toBe(MyClient.events.FOO);
    expect(e.error).toEqual('Hello');
    done();
  };

  client.addEventListener(MyClient.events.FOO, onFoo);
  client.emitError(MyClient.events.FOO, 'Hello');
  client.removeEventListener(MyClient.events.FOO, onFoo);
});