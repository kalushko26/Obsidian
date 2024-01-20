____

tags: #JavaScript #object #this

links: [[Контекст (this) в JS]]

_____

## Введение

`this` - это специальный идентификатор, который определяется в области видимости функции. 

Основные преимущества `this` заключаются в том, что *он позволяет переиспользовать* функции.

```javascript

function foo (num) {
	console.log("foo" + num)
	this.count++
}

foo.count = 0
var i

for (i = 0; i < 10; i++) {
	if (i > 5) {
		foo(i)
	}
} 

// foo: 6
// foo: 7
// foo: 8
// foo: 9

```

Функция foo() была вызвана 0 раз!!!

Это так, потому что this.count указывает не на объект , а на созданную глобальную переменную.

*this не связана с областью видимости так, как мы это понимаем.*

## Что такое `this` ?

*При вызове функции активируется "запись активации", также называемая контекстом выполнения.*

Запись содержит информацию откуда была вызвана функция (стек вызовов) , как она вызвана, какие параметры были переданы и так далее.

Одни из свойств этой записи при передачи является ссылка `this` .

### **Первое правило:** use strict

#useStrict Если действует режим *strict* : глобальный объект на момент исполнения используется для связывания по умолчанию, поэтому, вместо этого присваивается undefined.

```javascript

function foo () {
	"use strict"
	console.log(this.a)
}

var a = 2;
foo() // TypeError this is undefined

```

Но, при этом

```javascript 

function foo () {
	console.log(this.a)
	var a = 2
}

...

(function) () {
	"use strict"
	foo() //2
} ()

```

### **Второе правило:** Неявное связывание

1) *Наличие у места вызова контекстного объекта - владельца.*

```javascript

function foo() {
	console.log(this.a)
}

var obj ={
	a: 2,
	foo: foo // вызывает функцию foo
}

obj.foo() //2
```

2) *Для теста вызова важен только верхний и последний уровень*

```javascript

function foo() {
	console.log(this.a)
}

var obj2 = {
	a: 42,
	foo: foo // вызывает функцию foo()
}

var obj1 = {
	a: 2,
	obj2: obj2 // вызывает var obj2
}

obj1.obj2.foo //42
```

3) *Неявная потеря `this`*

*ключевое:* теряется связывание, возвращается связывание по умолчанию - глобального объекта или undefined.

```javascript

function foo() {
	console.log(this.a)
}

var obj = {
	a: 2,
	foo: foo
}

var bar = obj.foo
var a = "oops, Global!" // глобальное свойство
bar() // oops, Global!
```

4) Потеря связывания `this` обратными вызовами.

### **Третье правило:** Явное связывание

1) *Явное связывание*
Существуют методы #call и #apply 

В первом параметре метода содержится объект, который используется для `this` 
Мы напрямую указываем какое значение должно использоваться для `this`

```javascript

function foo() {
	console.log(this.a)
}

var obj = {
	a: 2
}

foo.call(obj) //2

```

2) *Жёсткое связывание*

```javascript

function foo() {
	console.log(this.a)
}

var obj = {
	a: 2
}

var bar = function() {
	foo.call(obj)
}

bar() //2
setTimeOut(bar, 1000) //2
bar.call(window) //2
```

3) *Контексты вызовов API*

Функции многих библиотек , а также многие ... поддерживают *context*, который избавляет нас от необходимости использовать #bind, чтобы функция гарантировала использование `this`.

```javascript
function foo(el) {
	console.log(el, this.id)
} 

var obj = {
	id: "awesome"
}

[1,2,3].forEach(foo, obj)
```

### **Четвёртое правило:** Связывание с new

Когда функция вызывается после оператора new (такие вызовы называются вызовами-конструкторами), они автоматически выполняют следующие действия:
1. Конструируются как новый объект
2. Производят его связывание с `[[Prototype]]`
3. Сконструированный объект назначается в качестве связывания `this` для этого вызова функции
4. Если функция не возвращает свой альтернативный объект, то вызов функции автоматически возвращает сконструированный объект.

```javascript

function foo(a) {
	this.a = a;
}

var bar = new foo(2) 
console.log(bar.a) //2

```

## Определение `this`

* Функция вызова с new
* Функция вызвана с call и apply
* Функция вызвана с контекстом
* `this` по умолчанию при `use strict` либо undefined или global

*Исключения:*

Если передать в `this` (call, bind и apply) значение null или undefined , то значения фактически игнорируются.

```javascript

function foo() {
	console.log(this.a)
}

var a = 2;
foo.call(null) //2

```

## Лексическое поведение `this`

Лексическая область видимости стрелочной функции:

```javascript

function foo() {
	return (a) => {
	//`this` здесь лексически наследуется от foo()
	console.log(this.a)
	}
}

var obj1 = {
	a: 2
}

var obj2 = {
	a: 3
}

var bar = foo.call(obj1)
bar.call(obj2) // 2, а не 3!

```

*Лексическое связывание стрелочной функции не может быть переопределено даже с new. Распространённое использование - это колбеки.*

## call, bind, apply

Объекты существуют в двух форматах: 
* *литеральной*

```javascript

var myObj = {
	key: value
}
```

* *конструированной*

```javascript

var myObj = new Object()

myObj.key = value

var myObj = {
	a: 4,
	writable: true,
	configurable: false,
	enumerable: true
}

```