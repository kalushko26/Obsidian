---
title: Какие методы есть в Redux Toolkit
draft: false
tags:
  - React
  - redux-toolkit
  - configureStore
  - createReducer
  - createAction
  - createSlice
  - TypeScript
info:
  - https://reactdev.ru/libs/redux-toolkit/#_46
  - https://redux-toolkit.js.org/
  - https://habr.com/ru/companies/inobitec/articles/481288/
---
Вот некоторые основные функции и концепции Redux Toolkit:
- configureStore— функция, предназначенная упростить процесс создания и настройки хранилища;
- createReducer— функция, помогающая лаконично и понятно описать и создать редьюсер;
- createAction— возвращает функцию создателя действия для заданной строки типа действия;
- createSlice— объединяет в себе функционал createAction и createReducer;
- **createSelector** — функция из библиотеки [Reselect](https://github.com/reduxjs/reselect), переэкспортированная для простоты использования.

*Redux Toolkit полностью интегрирован с TypeScript.* 

Более подробную информацию об этом можно получить из раздела [Usage With TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript/) официальной документации.

---

[[004 State Managers|Назад]]