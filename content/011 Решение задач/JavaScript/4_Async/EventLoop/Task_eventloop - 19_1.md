tags: #JavaScript #taskJS #EventLoop 
____

```js
setTimeout(function timeout() { 
	console.log('Таймаут'); 
}, 0); 

let p = new Promise(function(resolve, reject) { 
	console.log('Создание промиса'); 
	resolve(); 
}); 

p.then(function(){ 
	console.log('Обработка промиса'); 
}); 

console.log('Конец скрипта');
```


___
### [[011 Решение задач JS, TS и React|Назад]]