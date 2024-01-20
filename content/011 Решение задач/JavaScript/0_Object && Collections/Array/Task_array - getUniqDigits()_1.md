tags: #JavaScript #taskJS #set #array #sort #itOne 
___

```js
// вернуть массив уникальных чисел

const arr = ['a',0,4,'4','0',5,'d',7,0,'8',7,10,'s',1,3,'9',10,3,1,9,'u',6,5,'2'];

const getUniqDigits = (arr) => {
 // Ваш код здесь
}

console.log(getUniqDigits(arr)); // output [0,1,2,3,4,5,6,7,8,9,10]`
```

### Ответ

```js
const getUniqDigits = (arr) => {
  const digits = []

  for(let i = 0; i < arr.length; i++) {
    if(!isNaN(Number(arr[i]))) {
      digits.push(Number(arr[i]))
    }
  }
return [...new Set(digits)].sort((a, b) => a - b)
}

console.log(getUniqDigits(arr)); // output [0,1,2,3,4,5,6,7,8,9,10]`
```


___
### [[011 Решение задач JS, TS и React|Назад]]