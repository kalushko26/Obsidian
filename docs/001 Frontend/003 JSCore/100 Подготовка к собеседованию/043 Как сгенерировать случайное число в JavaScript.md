---
title: Как сгенерировать случайное число в JavaScript?
draft: false
tags:
  - "#JavaScript"
  - "#mathRandom"
  - "#number"
info:
---
![[Pasted image 20230702121001.png|600]]

Для генерации случайного числа в JavaScript можно использовать функцию `Math.random()`. Эта функция возвращает псевдослучайное число между 0 и 1.

Чтобы получить случайное целое число в определенном диапазоне, можно использовать следующую формулу:

```javascript
Math.floor(Math.random() * (max - min + 1)) + min
```

где `min` и `max` - это минимальное и максимальное значения диапазона. Функция `Math.floor()` округляет результат в меньшую сторону до ближайшего целого числа.

Например, чтобы сгенерировать случайное целое число от 1 до 10:

```javascript
const randomNum = Math.floor(Math.random() * 10) + 1
console.log(randomNum) // Выводит случайное целое число от 1 до 10
```

Этот код сначала генерирует случайное дробное число между 0 и 1 (с помощью `Math.random()`), затем умножает его на диапазон (10 - 1 + 1 = 10), округляет результат до ближайшего целого числа, и добавляет минимальное значение (1). В итоге, мы получаем случайное целое число от 1 до 10.

---

[[003 JSCore|Назад]]