---
title: Task_array - getSumOfPreparedNumbers()_1
draft: false
tags:
  - "#JavaScript"
  - "#taskJS"
  - "#array"
  - "#itOne"
---
```js
// дан массив, необходимо вернуть строку с ошибкой если одно из значений не является числом, 
// если все значения верны, то возвращаем разность суммы чисел кратных 7 и максимально значения массива

const arr = [1, NaN, 21, 40, 50, 35, 2, NaN, 16, 17, NaN, 98, 77, 49];
const arr1 = [true];
const arr2 = ['smth'];
const arr3 = [1, 11, 21, 40, 50, 35, 2, 6, 16, 17, 63, 98, 77, 49];

const getSumOfPreparedNumbers = (arr) => {
 // Ваш код здесь
}

console.log(getSumOfPreparedNumbers(arr)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr1)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr2)); // output 'входящие данные не удовлетворяют требованиям'
console.log(getSumOfPreparedNumbers(arr3)); // output 245
```

**Ответ

```js
const getSumOfPreparedNumbers = (arr) => {
  const filtered = arr.filter(el => isNaN(String(el)))
  if (filtered.length > 0) {
    console.error('входящие данные не удовлетворяют требованиям')
  } else {
    const sevenDig = [];

    for(let i = 0; i < arr.length; i++) {
      if(arr[i] % 7 == 0) {
        sevenDig.push(arr[i])
      }
    }

    const digitSum = sevenDig.reduce((acc, el) => {
      return acc + el
    }, 0)

    return digitSum - arr.sort((a, b) => b - a)[0]
  }
}
```


___

[[011 Решение задач JS, TS и React|Назад]]