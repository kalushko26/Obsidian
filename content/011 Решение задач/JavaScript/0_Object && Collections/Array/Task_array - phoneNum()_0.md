tags: #JavaScript #taskJS #array #инфовотч #Яндекс
____

```js
// Нужно написать функцию
// На вход поступает массив чисел. Числа больше либо равны 0 и не повторяются.
// Если числа из исходного массива (не обязательно идущие по порядку)
// образуют непрерывную числовую последовательность, то следует их добавить в
// результат по паттерну 'Начало последотельности - Конец последовательности'
// Если число не входит в последовательность, то добавить его в результат через запятую
// Алгоритмическая сложность должна быть не выше O(n log n)

// Пример:
// Параметр: [9, 0, 6, 8, 2, 5, 4]
// Возвращаемый результат: '0, 2, 4-6, 8-9'

function phoneNum(arr) {
	// Ваш код здесь
}

console.log(phoneNum([9, 0, 6, 8, 2, 5, 4])) // '0, 2, 4-6, 8-9'
```

### Ответ

```js
const testFunc = (nums) => {
  const sortedNums = nums.sort((a, b) => a - b);
  let res = "";
  let start = sortedNums[0];
  let end = sortedNums[0];

  for (let i = 1; i < sortedNums.length; i++) {
    if (sortedNums[i] === end + 1) {
      end = sortedNums[i];
    } else {
      if (start === end) {
        res += ${start},;
      } else {
        res += ${start}-${end},;
      }
      start = sortedNums[i];
      end = sortedNums[i];
    }
  }

  if (start === end) {
    res += ${start},;
  } else {
    res += ${start}-${end},;
  }

  return res.slice(0, -1);
};

console.log(testFunc([9, 0, 6, 8, 2, 5, 4]));
```



___
### [[011 Решение задач JS, TS и React|Назад]]