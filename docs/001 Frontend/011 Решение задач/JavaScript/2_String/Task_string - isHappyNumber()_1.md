---
title: Task_string - isHappyNumber()_1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#string"
---
```js
/*
Счастливые числа
Назовем счастливыми числами те, которые в результате ряда преобразований вида 
"сумма квадратов цифр" превратятся в единицу. 
Например, для числа 7 цепочка преобразований будет выглядеть так:

7   => 7^2 = 49,
49  => 4^2 + 9^2 = 16 + 81 = 97,
97  => 9^2 + 7^2 = 81 + 49 = 130,
130 => 1^2 + 3^2 + 0^2 = 10,
10  => 1^2 + 0^2 = 1.

Реализуйте функцию, которая должна вернуть true, если число счастливое, и false, если нет. 
Количество итераций процесса поиска необходимо ограничить числом 10.
*/

const isHappyNumber = (str, count = 1) => {
    let happy = str.split('');
    
    return (function() {
        let square = happy.reduce((acc, el) => {
            acc += Number(el)**2
            return acc
        }, 0);
                console.log(count, square)
        
        if(count > 10) {
            return false
        };
        
        if(square === 1) {
            return true
            
        } else {
            const newStr = String(square);
            return isHappyNumber(newStr, count + 1);
        };
    })();
}
    
    
console.log(isHappyNumber('7'));
```

___

[[011 Решение задач JS, TS и React|Назад]]