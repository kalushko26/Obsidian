---
title: Как получить данные из state ?
draft: false
tags:
  - React
  - Zustand
  - state
  - create
  - State-manager
info:
---
Используйте хук `useStore` для получения данных из состояния. Пример:

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Использование в компоненте
function Counter() {
  const count = useStore((state) => state.count);

  return <h1>{count}</h1>;
}
```

Здесь `count` извлекается из состояния с помощью `useStore`.

___

[[004 State Managers|Назад]]