---
title: Что такое slice ?
draft: false
tags:
  - React
  - Zustand
  - slice
  - create
  - State-manager
info:
---
В Zustand "slice" — это часть состояния, которая управляется отдельным хуком. Это позволяет разделить состояние на независимые части, что упрощает управление и тестирование.

```jsx
import { create } from 'zustand';

const useCounterSlice = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const useUserSlice = create((set) => ({
  name: 'John',
  setName: (newName) => set({ name: newName }),
}));

// Использование в компоненте
function App() {
  const count = useCounterSlice((state) => state.count);
  const increment = useCounterSlice((state) => state.increment);
  const name = useUserSlice((state) => state.name);
  const setName = useUserSlice((state) => state.setName);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <h2>{name}</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

Здесь `useCounterSlice` и `useUserSlice` — это разные "slice" состояния.

___

[[004 State Managers|Назад]]