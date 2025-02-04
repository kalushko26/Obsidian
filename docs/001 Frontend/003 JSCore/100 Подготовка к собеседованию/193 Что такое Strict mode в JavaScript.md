---
title: Что такое Strict mode в JavaScript?
draft: false
tags:
  - "#JavaScript"
  - "#strict-mode"
info: []
---
![[Pasted image 20230703121206.png|600]]

_Strict mode_ - это определенный режим работы JavaScript, который вводится с помощью директивы `"use strict"`. Этот режим позволяет разработчикам писать более безопасный и строгий код, уменьшая количество ошибок и неявных действий.

Когда директива `"use strict"` включена, JavaScript работает в строгом режиме, в котором определены новые правила поведения для интерпретатора. В строгом режиме некоторые функции, которые в обычном режиме работают без ошибок, могут вызывать ошибки, что помогает выявлять проблемы и улучшать качество кода.

Вот некоторые из изменений, вводимых строгим режимом:

- Использование необъявленных переменных вызывает ошибку.
- Присваивание значения только для чтения свойства вызывает ошибку.
- Использование `eval()` в качестве локальной переменной вызывает ошибку.
- Использование слова `delete` для удаления переменных, функций или функций-конструкторов вызывает ошибку.
- Использование дублирующихся имен параметров в функциях вызывает ошибку.
- Использование `with` вызывает ошибку.

Директива `"use strict"` может быть указана как в глобальной области видимости, так и внутри функций. Когда указывается в глобальной области видимости, она включает строгий режим для всего скрипта. Когда указывается внутри функции, строгий режим включается только для этой функции.

Вот пример использования директивы `"use strict"`:

```javascript
"use strict"

function doSomething() {
  x = 10 // вызывает ошибку, потому что x не объявлена
  return x
}

console.log(doSomething())
```

В этом примере мы используем директиву `"use strict"` внутри функции `doSomething()`. Когда функция запускается, она пытается присвоить значение переменной `x`, которая не была объявлена, что вызывает ошибку в строгом режиме.

Строгий режим в JavaScript помогает разработчикам писать более безопасный и строгий код, что улучшает качество и надежность программного обеспечения.

---

[[003 JSCore|Назад]]