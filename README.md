# Emitter

Реализован на основе ассоциативного массива. `key` - событие, `value` - массив обработчиков события.

``` js
class Emitter{
  constructor(){
    this.actions = new Map();
  }
  //Сложность O(1)
  on(action, handler){
    //Выбор элемента по индексу - сложность O(1)
    const actionHandlers = this.actions.get(action);
    if(actionHandlers){
      actionHandlers.push(handler);
      //Вставка элемента в map - сложность O(1)
      this.actions.set(action, actionHandlers);
    } else {
      this.actions.set(action, [handler]);
    }
    return this;
  }
  //в случее нахождения actionHandlers сложность O(N) иначе O(1)
  off(action, handler){
    //Выбор элемента по индексу - сложность O(1)
    const actionHandlers = this.actions.get(action);
    //Поиск элемента по индексу - сложность O(N)
    actionHandlers && actionHandlers.length && actionHandlers.splice(actionHandlers.indexOf(handler), 1);
    return this;
  }
  // Сложность O(N)
  emit(action){
    //Выбор элемента по индексу - сложность O(1)
    const actionHandlers = this.actions.get(action);
    //Проход по массиву сложность O(N)
    actionHandlers && actionHandlers.length && actionHandlers.forEach( handler => handler());
    return this;
  }
}
```
# Suggest

Реализованы 2 способа:
- `FirstSearch`: 
  - Находит первые 10 совпавших элементов с помощью метода ` Array.prototype.indexOf() ` 
  - Сложность `O(N^2)`.
- `SecondSearch`:
  - Строится ассоциативный массив, в котором `key` это подстрока элементов массива, 
    а `value` это массив строк подходящих под данную подстроку. Тратится много времени и памяти на построение таблицы,
    но поиск занимает меньше времени.
  - Сложность `O(1)`;
