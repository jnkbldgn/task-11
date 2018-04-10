import Emitter from './emitter.js';

const emitter = new Emitter();

const handler1 = () => console.log('handler1');

emitter.on('handler1', handler1)
      .on('handler2', () => console.log('handler2'))
      .on('handler1', () => console.log('handler11'))
      .on('handler3', () => console.log('handler3'));

emitter.emit('handler1')
      .emit('handler2')
      .emit('handler3');

emitter.off('handler1', handler1)
      .emit('handler1');