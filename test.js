const { Model, View, Controller } = require('.');

class MyModel extends Model {
  constructor() {
    // by calling super we will define 
    // a getter and a setter for the time property
    super({
      time: Date.now()
    });
  }

  updateTime() {
    this.time = Date.now();
  }
}

// This controller just triggers a refresh event per second until it's stopped.
class MyController extends Controller {
  start() {
    this.trigger('refresh');
    this._interval = setInterval(() => this.trigger('refresh'), 1000);
  }
  stop() {
    clearInterval(this._interval);
  }
}

class MyView extends View {
  // you can rename value and previous as you like
  print({ value: newValue, previous: oldValue }) {
    console.log('> ', newValue, oldValue);
  }
}

class MyView2 extends View {
  print({ value }) {
    console.log('=> ', new Date(value).toISOString());
  }
}

const view = new MyView(),
  view2 = new MyView2(),
  model = new MyModel(),
  controller = new MyController();

model.wire(controller, 'refresh', 'updateTime');
// in this example we show that multiple views can be wired to a model
view.wire(model, 'time', 'print');
view2.wire(model, 'time', 'print');

controller.start();
setTimeout(() => controller.stop(), 3000);

class MyModel2 extends Model {
  constructor() {
    super({ called: 0 });
  }

  increment() {
    this.called++;
  }

  notify() {
    this.trigger('notify');
  }
}

const model2 = new MyModel2();
model2.increment();
model2.increment();

class ComplexView extends View {
  onNotify({ wired }) {
    console.log('notified', wired.called);
  }
}

const complex = new ComplexView();
complex.wire(model2, 'notify', 'onNotify');
model2.notify();
complex.unwire(model2, 'notify', 'onNotify');
model2.notify();
