---
title: Свойство overflow
draft: false
tags:
  - "#CSS"
  - "#CSS-свойство"
  - "#overflow"
info:
---
*Свойство overflow* управляет отображением содержания блочного элемента, если оно целиком не помещается и выходит за область заданных размеров.

Значения

1. **Visible** Отображается все содержание элемента, даже за пределами установленной высоты и ширины.
2. **Hidden** Отображается только область внутри элемента, остальное будет скрыто.
3. **Scroll** Всегда добавляются полосы прокрутки.
4. **Auto** Полосы прокрутки добавляются только при необходимости.
5. **Inherit** Наследует значение родителя.

![[Pasted image 20221201162812.png]]

~~~html
<!DOCTYPE html>

<html>
 <head>
  <meta charset="utf-8">
  <title>overflow</title>
  <style>
   .layer {
    overflow: scroll; /* Добавляем полосы прокрутки */
    width: 300px; /* Ширина блока */
    height: 150px; /* Высота блока */
    padding: 5px; /* Поля вокруг текста */
    border: solid 1px black; /* Параметры рамки */
   }
  </style>
 </head>
 <body>
   <div class="layer">
   <h2>Duis te feugifacilisi</h2>
   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
    nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat.
    Ut wisis enim ad minim veniam, quis nostrud exerci tution ullamcorper suscipit
    lobortis nisl ut aliquip ex ea commodo consequat.</p>
  </div>
 </body>
</html>
~~~

___

[[002 CSS|Назад]]