tags: #JavaScript #recursion #taskJS #SignalINC 
___

```js
// Написать функцию которая симмирует цифры в числе пока их две или больше

// 16  -->  1 + 6 = 7
// 942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2
```

### Ответ

```js
// Написать функцию которая симмирует цифры все
function sumDigits(num) {
	return [num].join(' ').split('').reduce((acc, el) => {
		return acc = acc + +el;
	}, 0)
}

// Усложняем задачу, цифра должна остаться одна

function sumDigits(num) {
	const arr = [num].join(' ').split('')
	const res = arr.reduce((acc, el) => {
		return acc = acc + +el;
	}, 0);

	if(res < 10 ) {
		return res
	} else {
		return sumDigits(res)
	}
}

console.log(sumDigits(123)) // 6
console.log(sumDigits(904)) // 4
console.log(sumDigits(132189)) // 6
console.log(sumDigits(493193)) // 2
```

___
### [[011 Решение задач JS, TS и React|Назад]]