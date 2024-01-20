---
title: Заголовок
draft: true
tags:
  - example-tag
aliases: 
cssclasses:
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/w-vUj0gHGgg?start=538" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Ответы

![[Pasted image 20230703183457.png|600]]

_ООП (Объектно-ориентированное программирование)_ - это методология программирования, которая основана на понятии объектов, которые имеют свойства и методы, а также могут взаимодействовать друг с другом.

Основными принципами ООП являются:

1. _`Инкапсуляция`_ - это _принцип, который объединяет данные и методы, работающие с этими данными, в один объект._ Инкапсуляция позволяет скрыть детали реализации объекта от других объектов и предоставить только необходимые интерфейсы для работы с данными и методами.

```js
function createCounter() {
  let count = 0

  function increment() {
    count++
  }

  function decrement() {
    if (count > 0) {
      count--
    }
  }

  function getCount() {
    return count
  }

  return {
    increment,
    decrement,
    getCount,
  }
}

const counter = createCounter()
console.log(counter.getCount()) // 0

counter.increment()
counter.increment()
console.log(counter.getCount()) // 2

counter.decrement()
console.log(counter.getCount()) // 1
```

Достаточно просто реализуется посредством создания объектов и замыканий.

2. _`Наследование`_ - это _принцип, который позволяет создавать новый класс на основе существующего, наследуя его свойства и методы_. Наследование позволяет уменьшить количество дублирования кода, упростить его поддержку и расширение.

Пример наследования в веб-приложении на JavaScript можно реализовать с помощью прототипного наследования или с использованием классов и ключевых слов `extends` и `super`.

```js
// Базовый класс
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a sound.`)
  }
}

// Подкласс, наследующий от базового класса Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name) // Вызов конструктора базового класса

    this.breed = breed
  }

  speak() {
    console.log(`${this.name} barks.`)
  }

  fetch() {
    console.log(`${this.name} fetches the ball.`)
  }
}

// Создание экземпляра класса Dog
const dog = new Dog("Buddy", "Golden Retriever")
dog.speak() // "Buddy barks."
dog.fetch() // "Buddy fetches the ball."
console.log(dog.name) // "Buddy"
console.log(dog.breed) // "Golden Retriever"
```

3. _`Полиморфизм`_ - это _принцип, который позволяет объектам одного класса иметь разные формы, т.е. проявлять различное поведение в зависимости от контекста._ Полиморфизм позволяет упростить программу и уменьшить количество кода, необходимого для решения задач.

Можно реализовать с помощью переопределения методов в подклассах, чтобы они имели различное поведение, но имели одинаковую сигнатуру. Вот пример:

```js
// Базовый класс
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a sound.`)
  }
}

// Подкласс, наследующий от базового класса Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name)

    this.breed = breed
  }

  speak() {
    console.log(`${this.name} barks.`)
  }
}

// Подкласс, наследующий от базового класса Animal
class Cat extends Animal {
  constructor(name, color) {
    super(name)

    this.color = color
  }

  speak() {
    console.log(`${this.name} meows.`)
  }
}

// Создание экземпляров классов
const dog = new Dog("Buddy", "Golden Retriever")
const cat = new Cat("Whiskers", "Gray")

dog.speak() // "Buddy barks."
cat.speak() // "Whiskers meows."
```

4. _`Абстракция`_ - это _принцип, который позволяет абстрагироваться от деталей реализации объектов и сосредоточиться на их существенных характеристиках._ Абстракция позволяет упростить программу и сделать ее более понятной для других разработчиков.

Может быть реализована с помощью создания абстрактных классов или интерфейсов, которые определяют общие методы и свойства для группы объектов:

```js
// Абстрактный класс, представляющий фигуру
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Cannot instantiate abstract class.")
    }
  }

  // Абстрактный метод, представляющий вычисление площади
  calculateArea() {
    throw new Error("Method not implemented.")
  }
}

// Класс, представляющий прямоугольник
class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  calculateArea() {
    return this.width * this.height
  }
}

// Класс, представляющий круг
class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius
  }
}

// Создание экземпляров классов
const rectangle = new Rectangle(5, 10)
const circle = new Circle(7)

console.log(rectangle.calculateArea()) // 50
console.log(circle.calculateArea()) // ~153.94
```

Эти принципы являются основой ООП и позволяют разработчикам создавать более гибкие, удобные для использования и легко поддерживаемые программы.

<a href="https://www.youtube.com/watch?v=VjGdjqyXbhg&list=PLNkWIWHIRwMGlOBjDYTeqnNcuZ2cH1_7-&index=9" target="_blank">Просто об ООП (Парадигмы ООП): 21:13</a>

---

#ООП #инкапсуляция #полиморфизм #наследование #абстракция #softskills

---

#### [[000 Browser|Назад]]
