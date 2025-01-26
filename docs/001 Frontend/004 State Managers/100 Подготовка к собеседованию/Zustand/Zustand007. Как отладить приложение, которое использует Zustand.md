---
title: Как отладить приложение, которое использует Zustand? Как использовать devTools?
draft: false
tags:
  - React
  - Zustand
  - State-manager
  - DevTools
info:
---
Для отладки приложения с Zustand можно использовать Redux DevTools. 

Пример:

```JSX
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
);

// Использование в компоненте
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

Здесь `devtools` middleware позволяет использовать Redux DevTools для отладки состояния.

___

[[004 State Managers|Назад]]