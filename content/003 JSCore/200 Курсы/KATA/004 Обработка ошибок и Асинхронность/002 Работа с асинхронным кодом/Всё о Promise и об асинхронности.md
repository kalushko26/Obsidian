____

tags: #JavaScript #promise #

_____

## Как работают #promise 

![[Pasted image 20230328094207.png]]

#Promise — это специальный объект в #JavaScript, который связывает «создающий» и «потребляющий» коды вместе которая соответствует стандарту Promises/A+ [https://promisesaplus.com/](https://promisesaplus.com/)

```javascript
new Promise((resolve, reject) => {...})
```
Конструктор получает 2 аргумента: #resolve для выполнения обещания и #reject для его отклонения.

Обещание может находиться в 1 из 3 разных состояний: в ожидании, выполнено, отклонено.
![[Pasted image 20230328094449.png]]

Как только обещание меняет свое состояние с ожидания на выполнение или отклонение, его нельзя изменить снова.
![В ожидании => выполнено, в ожидании => отклонено](https://res.cloudinary.com/practicaldev/image/fetch/s--MVkW1duV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aqjwbm1vsl2vh1fjd9us.png)

```javascript
const result = new Promise((resolve, reject) => {
  resolve(1); // pending => fulfilled with value === 1
  resolve(2); // promise is already fulfilled. No effect
  resolve(3); // promise is already fulfilled. No effect
});

result.then((value) => console.log(value)); // 1
```

Здесь мы используем #then, один из самых важных элементов промисов:  
```javascript
function onResolve(value) {}
function onReject(reason) {}
new Promise((resolve, reject) => {...}).then(onResolve, onReject)
```

#then обратный вызов позволяет выполнять код, когда предыдущее обещание выполнено или отклонено.

Каждый `.then`обратный вызов может быть вызван только один раз. 
Возможны 2 сценария:
1.  Обещание выполняется
2.  Промис был выполнен до того, как мы вызвали `.then`, поэтому обратный вызов будет выполнен в #microtask после того, как мы достигнем конца текущей задачи и выполним ранее запланированные микрозадачи.

```javascript
// Запускаем основную задачу
let resolve; 
const result = new Promise((_resolve) => {
  resolve = _resolve;
});

setTimeout(() => {console.log(3)}, 0); // Запланируем тайм-аут, 
// который будет выполняться в отдельной задаче macrotask

result.then(value => console.log(1)); // Планирование обратного вызова onResolve
// к promise, которое находится в состоянии ожидания

resolve('Hey'); // разрешить promise со значением == 'Hey'
//   В этот момент все ранее запланированные обратные вызовы `.then`
// будут помещенены в очередь микрозадач
// У нас будет очередь микрозадач:
// value => console.log(1);

result.then(value => console.log(2)); // Вставим новый обратный вызов
// Очередь микрозадач:
// value => console.log(1);
// value => console.log(2)

// Конец макрозадач
// Выполнить 2 микрозадачи одну за другой и вывести 1, 2
// Завершение всех запланированных микрозадач
// Выполнить новую макрозадачу по тайм-ауту
// вывести 3
```

Каждый `then`вызов возвращает новый экземпляр обещания. 
Это позволяет нам «связывать» промисы:

![[Pasted image 20230328095902.png]]

`.then` обратные вызовы выполняются в очереди микрозадач:

Если у нас в очереди 3 #macrotask, то они будут выполняться одна за другой:
![[Pasted image 20230328095934.png]]

Однако если мы планируем микрозадачу во время выполнения одной из задач, то эта микрозадача будет выполняться сразу после текущей макрозадачи: Если код планирует микрозадачу во время выполнения второй задачи, эта микрозадача будет выполняться сразу после завершения второй задачи, но перед третьей задачей, несмотря на то, что третья задача может быть поставлена ​​в очередь раньше.
![[Pasted image 20230328100031.png]]

Микрозадачи откладывают выполнение макрозадач
Бесконечная цепочка обещаний может «заморозить» вкладку:

```javascript
function freeze(value) {
  console.log(value)
  return Promise.resolve(value + 1)
    .then(freeze); // Здесь асинхронная операция
  // но она планирует новую микрозадачу,
  // что предотвращает выполнение любой другой макрозадачи,
  // включая обновления пользовательского интерфейса UI
}
freeze(1);
```

Поскольку промисы выполняются в #очередь-микрозадач , они имеют немного другую обработку ошибок.  Давайте посмотрим на это поближе.  

Чтобы обработать ошибку, мы можем либо предоставить второй обратный вызов #then методу, либо использовать #catch.  
Вообще говоря `.catch`, это псевдоним для .then без первого аргумента:

```javascript
.catch(onReject)
// равно:
.then(value => value, onReject)
```

Когда промис отклоняется, он игнорирует все `onResolve` обратные вызовы до первого `onReject` обработчика

```javascript
Promise.reject('fail')
 .then(value => console.log(1)) // Ничего не выполняется
 .then(value => console.log(2)) // Ничего не выполняется
 .catch(reason => console.log(reason)) // выведет "Провалено"
```

`.catch`, `.then` с обратным вызовом onReject возвращает обещание. Если вы не отклоните обещание снова, оно будет выполнено:
```javascript
Promise.reject('fail')
 .catch(reason => console.log(reason)) // выведет "Провалено", вернет `undefined`
 .then(value => console.log(value)) // выведет `undefined`
 .catch(reason => console.log('fail 2')) // Ничего не выполняется, promise реализован
```

Это похоже на `try{}catch(e){}` блоки. Если вы попадаете в `catch(e) {}` блокировку, вам нужно повторно выдать ошибку, если вы хотите обработать ее позже. То же самое работает с обещаниями.

Вместо `error`события необработанные отказы от обещаний создают `unhandledrejection`событие.
```javascript
globalThis.addEventListener("unhandledrejection", (event) => {
  console.warn(`unhandledrejection: ${event.reason}`);
});
Promise.reject('test');

// Напечатает: 'unhandledrejection: test'
```

Добавление кода микрозадачи отклонит обещание:  
```javascript
Promise.resolve(1)
  .then(value => {throw value + 1})
  .catch(reason => console.log(reason)) // Выведет 2
```

В качестве альтернативы вы можете вернуть Promise.reject:  
```javascript
Promise.resolve(1)
  .then(value => Promise.reject(value + 1))
  .catch(reason => console.log(reason)) // Выведет 2
```

Когда вы разрешаете обещание, разрешение его с помощью Promise. #reject также отклонит его:  
```javascript
new Promise(resolve => resolve(Promise.reject(1)))
  .then(value => Promise.reject(2))
  .catch(reason => console.log(reason)) // prints 1
```

### Вспомогательные методы

📝Promise.all позволяет ждать до того, как все обещания изменят свое состояние на выполненное или хотя бы одно обещание будет отклонено  

```javascript
const a = Promise.resolve(1);
const b = new Promise((resolve) => {
  setTimeout(() => resolve('foo'), 1000);
});
const c = Promise.resolve('bar');

Promise.all([a, b, c]).then(console.log); // [1, 'foo', 'bar']
```

[![Обещай все](https://res.cloudinary.com/practicaldev/image/fetch/s--wzAj1dEu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wtkug033er3sehobkiww.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--wzAj1dEu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wtkug033er3sehobkiww.png)

Если какое-либо из обещаний будет отклонено, Promise.all также будет отклонен:  

```javascript
const a = Promise.reject(1); // Now we reject the promise
const b = new Promise((resolve) => {
  setTimeout(() => resolve('foo'), 1000);
});
const c = Promise.resolve('bar');

Promise.all([a, b, c])
  .then(console.log) // Nothing
  .catch(console.log); // 1
```

📝 Promise.allSettled ожидает, что все промисы изменят свое состояние. Он возвращает массив со значениями и статусами обещаний.  

```javascript
const a = Promise.reject(1); // rejected promise

// 2 resolved promises
const b = new Promise((resolve) => {
  setTimeout(() => resolve('foo'), 1000);
});
const c = Promise.resolve('bar');

Promise.allSettled([a, b, c]).then(console.log); 
// [
//   {status: 'rejected', reason: 1}
//   {status: 'fulfilled', value: 'foo'}
//   {status: 'fulfilled', value: 'bar'}
// ]
```

📝 Метод Promise.race() возвращает обещание, которое выполняется или отклоняется, как только одно из обещаний выполняется или отклоняется со значением или причиной из этого обещания.  

```javascript
const a = Promise.reject(1); // rejected promise

// 2 resolved promises
const b = new Promise((resolve) => {
  setTimeout(() => resolve('foo'), 1000);
});
const c = Promise.resolve('bar');

Promise.race([a, b, c])
  .then(console.log) // nothing, as the first promise `a` is rejected
  .catch(console.log) // 1
```

📝 Если поставить в Promise.race несколько уже выполненных или отклоненных обещаний, Promise.race будет зависеть от порядка элементов.

Итак, если мы изменим `Promise.race([a,b,c])`первый пример на , `Promise.race([b,c,a])`возвращенное обещание будет выполнено со значением «bar»:  

```javascript
const a = Promise.reject(1); // rejected promise

// 2 resolved promises
const b = new Promise((resolve) => {
  setTimeout(() => resolve('foo'), 1000);
});
const c = Promise.resolve('bar');

// We put 'a' at the very end
Promise.race([b, c, a])
  .then(console.log) // 'bar'
  .catch(console.log) // nothing
```

Вы можете использовать этот трюк, чтобы проверить, выполнено ли уже ваше обещание.

---

_Подводя итог, в этой статье рассматриваются базовые механизмы промисов и детали выполнения. Следующие статьи будут посвящены параллельному и последовательному выполнению, сборке мусора и некоторым экспериментам с объектами, которые можно использовать._

## Как получить текущий статус #promise и построить очередь promise

### TL&DR

>1. Проверить статус обещания  
>2. Обещанная очередь  

### Как получить текущий статус promise

После того, как вы создали промис, вы больше не можете получить информацию во время выполнения, является ли промис `pending` все `fulfilled` еще `rejected`.

Вы можете увидеть текущий статус промиса в отладчике:  
[![DevTools показывает статус обещания](https://res.cloudinary.com/practicaldev/image/fetch/s--sm7H1Q_E--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4qn2t3t9sd3jbthpjmg1.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--sm7H1Q_E--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4qn2t3t9sd3jbthpjmg1.png)

Из отладчика мы видим, что `[[PromiseState]]`за это отвечает Symbol. 
Однако `PromiseState`это не [общеизвестный символ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols) , поэтому мы можем относиться к этому состоянию как к частному полю, которое мы не можем получить «прямо сейчас».

Однако мы можем использовать его `Promise.race`для проверки текущего статуса промиса. Для этого мы можем использовать функцию `Promise.race`:

📝 Promise.race проверяет обещания в их порядке. Например:  
```javascript
const a = Promise.resolve(1);
const b = Promise.resolve(2);
Promise.race([a, b]).then(console.log); // 1
```

И в то время:  
```javascript
const a = Promise.resolve(1);
const b = Promise.resolve(2);
Promise.race([b, a]).then(console.log); // 2
```

📝 Этот код проверяет статус обещания:  
```javascript
const pending = {
  state: 'pending',
};

function getPromiseState(promise) {
  // Мы ставим promise «ожидание» после promise проверить,
  // что заставляет .race сначала проверить `promise`
  return Promise.race([promise, pending]).then(
    (value) => {
      if (value === pending) {
        return value;
      }
      return {
        state: 'resolved',
        value
      };
    },
    (reason) => ({ state: 'rejected', reason })
  );
}
```

Использование [https://codesandbox.io/s/restless-sun-njun1?file=/src/index.js](https://codesandbox.io/s/restless-sun-njun1?file=/src/index.js)  

```javascript
(async function () {
  let result = await getPromiseState(Promise.resolve("resolved hello world"));
  console.log(result);

  result = await getPromiseState(Promise.reject("rejected hello world"));
  console.log(result);

  result = await getPromiseState(new Promise(() => {}));
  console.log(result);

  result = await getPromiseState("Hello world");
  console.log(result);
})();
```

Помимо проверки, эта функция `Promise.race`может быть полезна для запуска некоторого кода с тайм-аутами. Например:  

```javascript
const TIMEOUT = 5000;
const timeout = new Promise((_, reject) => setTimeout(() => reject('timeout'), TIMEOUT));

// Мы можем захотеть протестировать проверку, если тайм-аут отклонен
// перед трудоемкими операциями в асинхронном коде
// отменить выполнение
async function someAsyncCode() {/*...*/}

const result = Promise.race([someAsyncCode(), timeout]);
```

### Как создать собственную очередь обещаний

Иногда вам нужно выполнять разные блоки кода в определенном порядке один за другим. Это полезно, когда у вас много тяжелых асинхронных блоков, которые вы хотите выполнять последовательно. 

Мы должны помнить, что:  
📝 JS является однопоточным, поэтому у нас может быть параллельное выполнение.
Для этого мы можем реализовать очередь обещаний. Эта очередь будет помещать каждую функцию после всех ранее добавленных асинхронных функций.

Давайте проверим этот кодовый блок:  

```javascript
class Queue {
  // По умолчанию очередь пуста
  queue = Promise.resolve();

  enqueue(fn) {
    // Запланировать новую операцию в очереди
    const result = this._queue.then(fn);

    // избежать побочных эффектов.
    // Мы также можем предоставить обработчик ошибок в качестве улучшения.
    this._queue = result.then(() => {}, () => {});

    // Чтобы сохранить обещанный подход, давайте вернем результат `fn`
    return result;
  }

  // Если мы хотим просто понять, когда очередь закончилась
  wait() {
    return this._queue;
  }
}
```

Давайте проверим это:  

```javascript
// Рабочий симулятор
const emulateWork = (name, time) => () => {
    console.log(`Start ${name}`);
    return new Promise((resolve) => {setTimeout(() => console.log(`End ${name}`) || resolve(), time)})
}

// Давайте проверим, правильно ли работает очередь, если обещание не выполняется
const failTest = () => () => {
    console.log(`Start fail`);
    return Promise.reject();
}
const queue = new Queue();
queue.enqueue(emulateWork('A', 500));
queue.enqueue(emulateWork('B', 500));
queue.enqueue(emulateWork('C', 900));
queue.enqueue(emulateWork('D', 1200));
queue.enqueue(emulateWork('E', 200));
queue.enqueue(failTest());
queue.enqueue(emulateWork('F', 900));
```

У нас будет вывод:  
[![Вывод очереди обещаний](https://res.cloudinary.com/practicaldev/image/fetch/s--qGtn_gvM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/saym4ah7wixxdogcrrcx.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--qGtn_gvM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/saym4ah7wixxdogcrrcx.png)
Однако, когда обещание отклоняется, мы полностью проглатываем ошибку.  
Это означает, что если реальный код выйдет из строя, мы можем никогда об этом не узнать.

📝 Если вы работаете с промисами, не забудьте использовать `.catch` в конце цепочки промисов, иначе вы можете пропустить сбои в своем приложении!

Чтобы исправить ситуацию, мы можем предоставить обратный вызов для конструктора:  

```javascript
class Queue {
  _queue = Promise.resolve();

  // По умолчанию onError пуст.
  _onError = () => {};

  constructor(onError) {
    this._onError = onError;
  }

  enqueue(fn) {
    const result = this._queue.then(fn);

    this._queue = result.then(() => {}, this._onError);

    return result;
  }

  wait() {
    return this._queue;
  }
}
```

Или мы можем перевооружить обещание!  

```javascript
class Queue {
  _queue = Promise.resolve();

  enqueue(fn) {
    const result = this._queue.then(fn);
    this._queue = result.then(() => {}, () => {});

    // мы изменили возвращаемый результат на возвращаемый result.them()
    // перевооружиться promise
    return result.then();
  }

  wait() {
    return this._queue;
  }
}
```

Тот же тест сообщит об ошибке!  
[![Обработка ошибок](https://res.cloudinary.com/practicaldev/image/fetch/s--sneBhqXn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hm1idwr9zcwlqx9xxme8.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--sneBhqXn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hm1idwr9zcwlqx9xxme8.png)
📝 Каждая цепочка промисов может вызвать ошибку unhandledRejection.

Если вы хотите поэкспериментировать с кодом, который мы создаем: [https://codesandbox.io/s/adoring-platform-cfygr5?file=/src/index.js .](https://codesandbox.io/s/adoring-platform-cfygr5?file=/src/index.js)

### Подведение итогов

Промисы чрезвычайно полезны, когда нам нужно разрешить некоторые сложные асинхронные взаимодействия.

В следующих статьях мы поговорим, почему промисы в JS иногда называют `thenable`объектами, и продолжим наши эксперименты.

## Сборка мусора и утечки памяти

Promise в #JavaScript — это способ обработки асинхронных операций. Одна из самых сложных частей асинхронных операций заключается в том, что мы можем случайно получить утечку памяти, и поэтому чрезвычайно важно понимать, когда промисы подвергаются сборке мусора и что предотвращает сборку мусора промисов.

### TL&DR

1.  [В этом codeandbox](https://codesandbox.io/s/promises-article-first-example-8jfyh?file=/src/index.js) есть все примеры промисов и цепочек. Откройте песочницу и перезагрузите ее. Вы можете бежать `Promise example`сначала и `then example`после.

2.  В конце статьи вы найдете основные выводы из статьи.

---

Некоторые примечания об инструментах, которые мы будем использовать  

Эта статья предназначена для продвинутых пользователей, в ней исследуется, как #GC (сборщик мусора) работает с промисами. Если вы хотите получить базовую информацию о промисах, ознакомьтесь с более ранними статьями этой серии.

Мы будем использовать `FinalizationRegistry`, чтобы узнать, когда элемент проходит GCed. Прочтите [[020 Управление памятью. JS101. Сильные и слабые ссылки, FinalizationRegistry]] , если вы не знакомы с `FinalizationRegistry`.  

Чтобы ускорить сборку мусора, мы создадим множество фиктивных объектов и удалим к ним сильные ссылки.

Пожалуйста, не запускайте эксперименты в консоли инструментов разработчика. #DevTools поддерживает все объекты в рабочем состоянии, поэтому у вас будут ложноотрицательные результаты.

#FinalizationRegistry выводит в консоль строку и потраченное время.

Важно иметь в виду, что если обещание подходит для GC, это не означает, что оно будет немедленно собрано. Процесс GC в JavaScript не является детерминированным и происходит по усмотрению среды выполнения JavaScript.

Набросаем возможные сценарии:

### Явно сохраните ссылку на промис:

```javascript
const promise = new Promise((resolve, reject) => {...});
```

В этом случае у нас есть сильная ссылка на промис, и мы не будем его GC, пока он `const promise` существует.

📝 Пока вы сохраняете явную ссылку на свое обещание, оно не будет проверено сборщиком мусора

### Удалите ссылки на функции обещания, разрешения и отклонения:

```javascript
let promiseWithoutResolve = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Timeout for the promise that keeps no refs");
  }, 100000);
});

finalizationRegistry.register(promiseWithoutResolve, " which keeps no references"); 
promiseWithoutResolve = null;
```

Для этого теста мы не храним ни сильной ссылки на `promise`, ни `resolve`функции, однако функция обещания имеет довольно длительный тайм-аут.

📝 Когда вы теряете все ссылки на `resolve`, `reject`и сам экземпляр, объект помечается как GC, и как только GC запускается, он будет собран. 
(Примечание: JS GC имеет несколько поколений, поэтому, если ваш промис относится к третьему поколению, он может не быть собран).

### Кэш `resolve` и/или `reject` метод без строгой ссылки на сам экземпляр обещания

В реальных кодовых базах вы можете найти что-то похожее на:  

```javascript
let resolve;
let promise = new Promise((_resolve) => { 
  resolve = _resolve;
});
// Let's remove the reference to promise
promise = null;
```

Этот код выполняет 2 вещи:  
1) Удаляет сильную ссылку на промис  
2) Кэширует `resolve` функцию вне обратного вызова в конструкторе промиса.

У нас больше нет прямого доступа к обещанию, но неясно, будет ли это обещание поставлено в очередь для сборки мусора или оно останется, пока мы сохраняем ссылку на файл `resolve`.

Чтобы проверить это поведение, мы можем разработать эксперимент:  

```javascript
let promiseWithResolve = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 100000);
});

finalizationRegistry.register(promiseWithResolve , " which keeps resolve function"); 
promiseWithResolve = null;
```

Для такого эксперимента у нас есть выход:  

```javascript
Promise  which keeps resolve function. Time taken: 155765. 
```

📝 Промис будет храниться в памяти до тех пор, пока у нас есть ссылка `resolve`или `reject`обратные вызовы.  
📝 Если у нас есть обещание, которое живет в течение длительного периода времени, оно может попасть к старшему поколению, а это означает, что между потерей всех ссылок на обещание и его сборкой пройдет еще больше времени.

### `.then` - цепочка

Повседневный вариант использования:  

```javascript
new Promise(() => {}).then(() => {/* Some async code */}) 
```

Эксперимент для проверки:  

```javascript
let promiseWithThen = new Promise(() => {});
let then = promiseWithThen.then(() => {
  console.log("then reached");
});

finalizationRegistry.register(promiseWithThen, " with `then` chain");
finalizationRegistry.register(then, " then callback");

promiseWithThen = then = null;
```

Выход:  

```javascript
Promise  with `then` chain. Time taken: 191. 
Promise  then callback. Time taken: 732. 
```

Оригинал `promiseWithThen` никогда не будет разрешен, но он связан следующей `then`операцией, которая может сохранить ссылку на исходное обещание. К счастью, `then` это не мешает промису быть GCed.

📝 `.then` не мешает обещанию от GC. Только явные ссылки на обещание само по себе `resolve`и `reject`имеют значение.

### Что произойдет, если мы добавим `.then` к этим экспериментам?

Как мы обнаружили, `.then`. не предотвращает обещания от сборки мусора. Это означает, что это не должно иметь никакого эффекта.

Чтобы доказать это, мы можем разработать эксперимент, который находится `Then example` в этой песочнице: [https://codesandbox.io/s/promises-article-first-example-8jfyh?file=/src/index.js .](https://codesandbox.io/s/promises-article-first-example-8jfyh?file=/src/index.js)

Когда вы запустите эксперимент, вы увидите, что он `then` действительно не имеет никакого эффекта и не меняет никакого поведения.

### Почему несколько сетей .then держат обещание?

Иногда в коде встречаются цепочки .then:  

```javascript
Promise.resolve()
  .then(asyncCode1)
  .then(asyncCode2)
  ...
  .then(asyncCodeN);
```

Несмотря на то, что мы не сохраняем ссылку на промис, он не должен быть GC до того, как цепочка завершится.  
Дело в том, что `Promise.resolve()`возвращает разрешенный промис, а первый `.then` планирует запустить микрозадачу, так как предыдущий промис разрешен. Итак, у нас будет запланированный объем для выполнения.

`.then` возвращает обещание, которое связано следующей асинхронной операцией ( `asyncCode2`, ...). А значение для асинхронной операции — это возвращаемое значение предыдущего `.then` блока (в нашем случае это fn `asyncCode1`).

📝 если ваша `.then` цепочка получает «управление» (запланировано для выполнения или даже запущено выполнение), область действия функции имеет ссылку на разрешение или отклонение обещания, которое возвращается, `.then`и поэтому это обещание не будет проверено GCed.

### Подводить итоги:

Краткий список основных выводов:

📝 Ссылки на: `promise instance`само, `resolve`, `reject`сохранить обещание от сборки мусора.

📝 `.then`не мешает обещанию от GC.

📝 если ваша `.then`цепочка получает «управление» (запланировано для выполнения или даже запущено выполнение), область действия функции имеет ссылку на разрешение или отклонение обещания, которое возвращается, `.then`и поэтому это обещание не будет проверено GCed.

📝 Если у нас есть обещание, которое живет в течение длительного периода времени, оно может попасть к старшему поколению, а это означает, что между потерей всех ссылок на обещание и его сборкой пройдет еще больше времени.