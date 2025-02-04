---
title: Разница между глубокой (deep) и поверхностной (shallow) копиями объекта? Как сделать каждую из них?
draft: false
tags:
  - "#JavaScript"
  - "#object"
  - "#assign"
info:
  - "[[Как сделать глубокое копирование объекта|Как сделать глубокое копирование объекта?]]"
  - "[[Как поверхностно скопировать объект|Как поверхностно скопировать объект?]]"
---
В JavaScript есть два типа копирования объектов: поверхностное (shallow) и глубокое (deep) копирование. Рассмотрим каждый из этих видов копирования и способы их реализации.

_Поверхностное (shallow) копирование объекта_ создает новый объект, но ссылки на объекты внутри этого объекта остаются те же самые. То есть, если внутри скопированного объекта есть ссылка на другой объект, то обе ссылки будут указывать на один и тот же объект. При изменении значения внутри этого объекта изменится и оригинальный объект. Для поверхностного копирования объекта можно использовать метод `Object.assign()` или оператор расширения объектов `...`.

```javascript
// Поверхностное копирование объекта с помощью Object.assign()
const obj = { a: 1, b: { c: 2 } }
const copiedObj = Object.assign({}, obj)

console.log(copiedObj) // { a: 1, b: { c: 2 } }

// Поверхностное копирование объекта с помощью оператора ...
const obj = { a: 1, b: { c: 2 } }
const copiedObj = { ...obj }

console.log(copiedObj) // { a: 1, b: { c: 2 } }
```

_Глубокое (deep) копирование объекта_ создает новый объект и новые объекты для всех объектов, которые находятся внутри этого объекта. То есть, если внутри скопированного объекта есть ссылка на другой объект, то будет создан новый объект с тем же значением, что и оригинальный объект. При изменении значения внутри этого объекта изменения не будут влиять на оригинальный объект.
Для глубокого копирования объекта можно использовать рекурсивную функцию или библиотеки, такие как Lodash или jQuery.

```javascript
// Глубокое копирование объекта с помощью рекурсивной функции
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj
  }

  const copy = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    copy[key] = deepCopy(obj[key])
  }

  return copy
}

const obj = { a: 1, b: { c: 2 } }
const copiedObj = deepCopy(obj)

console.log(copiedObj) // { a: 1, b: { c: 2 } }
```

Важно понимать, что глубокое копирование может быть более ресурсоемким, чем поверхностное копирование, особенно если объект, который нужно скопировать, содержит много вложенных объектов.

---

[[003 JSCore|Назад]]