tags: #JavaScript #taskJS #currying 
____

```js
/*
Описание: 
Напишите функцию compose, которая принимает 
несколько функций и возвращает новую функцию, 
которая применяет эти функции в обратном порядке.
*/

function added(a) {
  return a + 1;
}

function multed(b) {
  return b * 2;
}

const composed = compose(multed, added);
console.log(composed(1)); // 8
```

### Ответ

```js

function compose(multOper, addOper) {
  return function(...args) {
    return multOper(addOper(...args))
  }
}

```

___
### [[011 Решение задач JS, TS и React|Назад]]