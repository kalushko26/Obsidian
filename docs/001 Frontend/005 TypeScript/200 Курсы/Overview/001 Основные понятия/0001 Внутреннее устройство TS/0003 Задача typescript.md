---
title: Задача typescript
draft: true
tags:
  - TypeScript
---
Предположим, что у нас есть следующий пример кода:

```javascript
const message = "hello!";
message();
```

Как мы знаем из курса JS, такой код выполнится со следующей ошибкой:  
  
        **TypeError: message is not a function**  
  
Мы нашли проблему, но сложность состоит в том, что эту ошибку мы получим только в runtime. Как указывалось ранее, такие ошибки намного труднее отследить, и не всегда мы сможем найти их на стадии разработки, если выполнение кода не дойдет до участка с ошибкой. 
К примеру, если бы код выглядел так, ошибку бы мы могли получить только при выполнении определенного условия:

```javascript
const something = false;
const message = "hello!";
if (something) {
  message();
}
```

TypeScript предлагает следующее решение:

```javascript
const message: string = "hello!";
message();
```

В первой строке мы задали переменную message тип string. При дальнейшей попытке вызова этой переменной как функции мы получим следующую ошибку на стадии компиляции кода из TS в JS:  
   
        **This expression is not callable.  
        Type 'String' has no call signatures.**  
 
Код не будет скомпилирован, и мы сможем устранить ошибку сразу. Нам не нужно тестировать программу в runtime и пытаться создать ситуацию, при которой указанный выше код будет вызван и отобразит ошибку. Более того, нам не обязательно даже указывать тип:

```javascript

const message = "hello!";
message();
```

Аналогичный и полностью валидный JS код в TS не компилируется и выдает ошибку:  
   
        **This expression is not callable.  
        Type 'String' has no call signatures.**  
 
Это связано с тем, что TS уже знает, что переменная message имеет тип string на основании того, что мы присвоили ей строку "hello!".  
Указанный выше пример с if тоже всегда выдаст ошибку компиляции TS, он проверяет все возможные варианты развития событий за нас.

```javascript
const something = false;
const message = "hello!";
 
if (something) {
  message();
}
```

Сама установка TS уже помогла найти ошибку, а мы еще даже не начали использовать его систему типов на полную мощность. Мы поговорим подробнее о механизме автоматического выведения типов в следующем пункте.
