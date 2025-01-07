---
title: Расскажите о хуках `useCallback()` и`useMemo()`
draft: false
tags:
  - "#React"
  - "#Hooks"
  - "#useCallback"
  - "#useMemo"
info:
  - https://reactdev.ru/reference/useCallback/#usecallbackfn-dependencies
  - https://habr.com/ru/articles/579242/
---
Хуки `useCallback()` и `useMemo()` - эsто дополнительные хуки в React, которые позволяют оптимизировать производительность и управлять поведением компонентов.

### **`useMemo()`**:

**useMemo()** - это хук, который сохраняет результат вызова функции (первый аргумент) и пересчитывает его только при изменении зависимостей (второй аргумент). `useMemo()` возвращает результат вызова первого аргумента.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

Хук `useMemo()` используется для оптимизации производительности.

В этом примере, `memoizedValue` - это мемоизированное значение, которое будет пересоздаваться только тогда, когда изменятся зависимости `a` или `b`.

Вызов useMemo имеет свою цену и это нужно понимать. Хорошо про цену рассказано [тут](https://youtu.be/i6DPqqbdIyw). Для себя я вывел следующее правило:

_Если сложность вычислений больше O(n), я использую useMemo. Если сложность вычислений постоянная или O(log n) - не использую. Про сложность хорошо рассказано [тут](https://tproger.ru/articles/computational-complexity-explained/)._

**useMemo()** стоит использовать в двух случаях:

1. Когда в компоненте выполняются сложные вычисления useMemo сохранит их и лишняя работа будет упразднена.
2. Когда нужно передать ссылочный тип данных в **мемоизированный** компонент.\*

### **`useCallback()`**:

_`useCallback()` возвращает мемоизированную версию функции, которая не будет пересоздаваться при каждом рендеринге компонента, если ее зависимости не изменились._

_`useCallback()` под капотом тот же `useMemo()` и по сути является синтаксическим сахаром._

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

В этом примере, `memoizedCallback` - это мемоизированная версия функции `doSomething`, которая будет пересоздаваться только тогда, когда изменятся зависимости `a` или `b`.

_`useCallback()` не работает с классическими замыканиями, но прекрасно работает с замыканиями, созданными с помощью `useRef()`_

Таким образом, одно из основных применений `useCallback()` - это оптимизация производительности рендеринга, путём кеширования функций, которые вы передаете дочерним компонентам.

Если вы пишете кастомный хук, рекомендуется обернуть все функции, которые он возвращает, в `useCallback()`

```jsx
function useRouter() {
  const { dispatch } = useContext(RouterStateContext)

  const navigate = useCallback(
    (url) => {
      dispatch({ type: "navigate", url })
    },
    [dispatch],
  )

  const goBack = useCallback(() => {
    dispatch({ type: "back" })
  }, [dispatch])

  return {
    navigate,
    goBack,
  }
}
```

Иногда вы можете захотеть вызвать функцию внутри [Effect:](https://reactdev.ru/learn/synchronizing-with-effects/)

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState("")

  function createOptions() {
    return {
      serverUrl: "https://localhost:1234",
      roomId: roomId,
    }
  }

  useEffect(() => {
    const options = createOptions()
    const connection = createConnection()
    connection.connect()
    // ...
  })
}
```

Это создает проблему. [Каждое реактивное значение должно быть объявлено зависимостью вашего Эффекта](https://reactdev.ru/learn/lifecycle-of-reactive-effects/) Однако, если вы объявите `createOptions` как зависимость, это заставит ваш Эффект постоянно переподключаться к чату:

```jsx
useEffect(() => {
  const options = createOptions()
  const connection = createConnection()
  connection.connect()
  return () => connection.disconnect()
}, [createOptions]) // 🔴 Problem: This dependency changes on every render
// ...
```

Чтобы решить эту проблему, вы можете обернуть функцию, которую нужно вызвать из Effect, в `useCallback`:

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState("")

  const createOptions = useCallback(() => {
    return {
      serverUrl: "https://localhost:1234",
      roomId: roomId,
    }
  }, [roomId]) // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions()
    const connection = createConnection()
    connection.connect()
    return () => connection.disconnect()
  }, [createOptions]) // ✅ Only changes when createOptions changes
  // ...
}
```

Это гарантирует, что функция `createOptions` будет одинаковой между повторными рендерингами, если `roomId` одинаков. **Однако, еще лучше устранить необходимость в зависимости от функции.** Переместите вашу функцию *внутрь* Effect:

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState("")

  useEffect(() => {
    function createOptions() {
      // ✅ No need for useCallback or function dependencies!
      return {
        serverUrl: "https://localhost:1234",
        roomId: roomId,
      }
    }

    const options = createOptions()
    const connection = createConnection()
    connection.connect()
    return () => connection.disconnect()
  }, [roomId]) // ✅ Only changes when roomId changes
  // ...
}
```

Теперь ваш код стал проще и не нуждается в `useCallback`. [Подробнее об удалении зависимостей от эффектов.](https://reactdev.ru/learn/removing-effect-dependencies/)

### **Отличия useCallback() и useMemo()**

| useCallback()                                                                                                                                | useMemo()                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _возвращает мемоизированную версию функции, которая будет пересоздаваться при каждом рендеринге компонента, если ее зависимости изменились._ | _возвращает мемоизированное значение, которое будет пересоздаваться при каждом рендеринге компонента, если ее зависимости изменились._                         |
| _вызывается пользователем_                                                                                                                   | _вызывается исходниками React_                                                                                                                                 |
| ---------                                                                                                                                    | _внутри не используются другие хуки, т.к. useMemo() отрабатывает на стадии рендеринга, модификация состояния запустит процесс заново. Произойдет зацикливание_ |
| _использует переданные аргументы_                                                                                                            | _игнорирует переданные аргументы_                                                                                                                              |
| _обязателен массив зависимостей, в случае отсутствия будет постоянный ререндер_                                                              | _разрешен undefined, но нельзя делать его опциональным_                                                                                                        |

`useCallback()` - сохраняет функцию между вызовами, если данные в массиве зависимостей не изменились. `useMemo()` - работает также, но для значений.

---

[[004 ReactCore|Назад]]