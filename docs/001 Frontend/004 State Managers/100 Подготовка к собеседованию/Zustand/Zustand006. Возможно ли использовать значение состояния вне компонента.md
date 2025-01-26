---
title: Возможно ли использовать значение состояния вне компонента ?
draft: false
tags:
  - React
  - Zustand
  - State-manager
  - getState
info:
---
Можно использовать значение состояния вне компонента, обращаясь к хранилищу напрямую. 

Пример:

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Использование вне компонента
const store = useStore.getState();
console.log(store.count); // Выводит текущее значение count

store.increment(); // Увеличивает count на 1
```

Здесь `useStore.getState()` позволяет получить текущее состояние хранилища вне компонента.

___

[[004 State Managers|Назад]]