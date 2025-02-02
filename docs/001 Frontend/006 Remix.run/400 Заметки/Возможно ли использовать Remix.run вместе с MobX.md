---
title: Возможно ли использовать Remix.run вместе с MobX ?
draft: false
tags:
  - React
  - Remix
  - MobX
info:
---

`Remix` отлично работает с MobX, поскольку он использует React в качестве UI-библиотеки. MobX можно использовать для управления состоянием клиентского приложения, сохраняя реактивность и удобство работы.

Приведем пример:

Создадим простое хранилище в `app/store.ts`:

```ts
import { makeAutoObservable } from "mobx";  

class CounterStore {   
  count = 0;    

  constructor() {     
    makeAutoObservable(this);   
  }    

  increment() {     
    this.count += 1;   
  }    

  decrement() {     
    this.count -= 1;   
  } 
}  

export const counterStore = new CounterStore();
```

В файле `app/routes/counter.tsx` подключаем MobX и используем состояние:

```tsx
import { observer } from "mobx-react-lite"; 
import { counterStore } from "~/store";  

const Counter = observer(() => {   
	return (     
		<div>       
			<h1>Счетчик: {counterStore.count}</h1>       
			<button onClick={() => counterStore.increment()}>+</button>       
			<button onClick={() => counterStore.decrement()}>-</button>     
		</div>   
	); 
});  

export default Counter;
```

- `makeAutoObservable()` делает объект реактивным.
- `observer` оборачивает компонент, чтобы MobX мог автоматически обновлять UI при изменении состояния.
- Кнопки вызывают методы `increment()` и `decrement()`, изменяя состояние.

___

[[006 Remix.run|Назад]]