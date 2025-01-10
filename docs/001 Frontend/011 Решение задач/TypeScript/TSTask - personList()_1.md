---
title: TSTask - personList()_1
draft: false
tags:
  - "#TypeScript"
  - "#tsTask"
  - "#unknownINC"
  - "#partial"
---
```ts
// Напишите тип, который будет делать ключи и поля для Record<PersonList, PersonProps> необязательными
type PersonList = "Max" | "Alex" | "Boris"

type PersonProps = {
  age: number,
  height: number,
}

let mans: Record<PersonList, PersonProps> ={
  Alex: {age: 23, height: 170},
  Max: {age: 20, height: 175}.
  
}
```

**Ответ

```ts
type PersonList = "Max" | "Alex" | "Boris";
type PersonProps = {
  age: number;
  height: number;
};

type PartialPerson = Partial<Record<PersonList, PersonProps>>;

let mans: PartialPerson = {
  Alex: { age: 23, height: 170 },
  Max: { age: 20, height: 175 },
};
```

____

[[011 Решение задач JS, TS и React|Назад]]