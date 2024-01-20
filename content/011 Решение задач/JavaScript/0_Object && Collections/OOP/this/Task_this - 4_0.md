tags: #JavaScript #this #taskJS 
____

```js
"useStrict"
var length = 4;

function cb() {
	console.log(this.length);
}

const object = {
	length: 5,
	method(cb) {
		cb();
	}
}

object.method(cb) // 
```

### Ответ

```js
"useStrict"
var length = 4;

function cb() {
	console.log(this.length);
}

const object = {
	length: 5,
	method(cb) {
		cb();
	}
}

object.method(cb) // 
```



___
### [[011 Решение задач JS, TS и React|Назад]]