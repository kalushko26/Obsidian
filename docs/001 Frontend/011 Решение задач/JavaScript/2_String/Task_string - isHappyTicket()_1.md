---
title: Task_string - isHappyTicket()_1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
---
```js
/*
"Счастливым" называют билет с номером, в котором сумма первой половины цифр равна сумме второй половины цифр. 
Номера могут быть произвольной длины, с единственным условием, что количество цифр всегда чётно, например: 33 или 2341 и так далее.

Билет с номером 385916 — счастливый, так как 3 + 8 + 5 === 9 + 1 + 6. Билет с номером 231002 не является счастливым, так как 2 + 3 + 1 !== 0 + 0 + 2.
Реализуйте и экспортируйте по умолчанию функцию, проверяющую является ли номер счастливым (номер — всегда строка). Функция должна возвращать true, если билет счастливый, или false, если нет.
*/

const isHappyTicket = (str) => {
    let rightRes = 0;
    let leftRes = 0;
    
    let rightStr = str.slice(-str.length/2);
    let leftStr = str.slice(0, str.length/2);
    
    for (let i = 0; i < str.length/2; i++) {
        rightRes += Number(rightStr[i]);
        leftRes += Number(leftStr[i]);
    };
    
    return rightRes === leftRes
}

console.log(isHappyTicket('385916')); // true
console.log(isHappyTicket('231002')); // false
console.log(isHappyTicket('1222'));   // false
console.log(isHappyTicket('054702')); // true
console.log(isHappyTicket('00'));     // true
```

___

[[011 Решение задач JS, TS и React|Назад]]