---
title: setState() - добавление элемента
draft: false
tags:
  - "#React"
  - "#setState"
info:
  - "[[0017 Как работает setState|Как работает setState?]]"
---
arr.push () - тоже изменение массива (нельзя выполнять на массивах из #State )
добавить элемент в конец массива: 
`const newArr = [... oldArr , newItem]`

добавить элемент в начало массива:
`const newArr = [newItem, ...oldArr]`

_____
