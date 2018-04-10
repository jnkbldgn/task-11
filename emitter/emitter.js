class Emitter{
  constructor(){
    this.actions = new Map();
  }
  // регистрируем handler для события
  on(action, handler){
    const actionHandlers = this.actions.get(action);
    if(actionHandlers){
      actionHandlers.push(handler);
      this.actions.set(action, actionHandlers);
    } else {
      this.actions.set(action, [handler]);
    }
    return this;
  }
  // удаляем handler у события
  off(action, handler){
    const actionHandlers = this.actions.get(action);
    actionHandlers && actionHandlers.length && actionHandlers.splice(actionHandlers.indexOf(handler), 1);
    return this;
  }
  // выполняем handlers у переданного события
  emit(action){
    const actionHandlers = this.actions.get(action);
    actionHandlers && actionHandlers.length && actionHandlers.forEach( handler => handler());
    return this;
  }
}

export default Emitter;