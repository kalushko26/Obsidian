---
title: Для чего используется элемент `picture`?
draft: false
tags:
  - "#HTML"
  - "#picture"
  - "#img"
  - "#sourse"
  - "#srcset"
info:
---
![[Pasted image 20230704020947.png|600]]

Элемент `picture` в HTML используется для предоставления различных изображений для разных размеров экранов и разных устройств. Этот элемент позволяет веб-разработчикам оптимизировать загрузку изображений, уменьшить время загрузки страницы и улучшить пользовательский опыт.

Элемент `picture` может содержать несколько дочерних элементов `source`, каждый из которых представляет собой альтернативный источник изображения для разных размеров экранов и разных устройств. Также элемент `picture` может содержать дочерний элемент `img`, который будет использоваться в случае, если ни один из дочерних элементов `source` не будет соответствовать размеру экрана или устройства.

Каждый элемент `source` должен иметь атрибут `srcset`, который содержит список путей к изображениям и соответствующие значения `w` или `x`, указывающие ширину изображения или плотность пикселей. Браузер использует эту информацию для выбора подходящего изображения.

Например, следующий код использует элемент `picture` для отображения разных изображений в зависимости от размера экрана:

```html
<picture>
  <source media="(min-width: 800px)" srcset="large-image.jpg">
  <source media="(min-width: 400px)" srcset="medium-image.jpg">
  <img src="small-image.jpg" alt="Small Image">
</picture>
```

В этом примере, если ширина экрана больше или равна 800 пикселей, будет загружено изображение "large-image.jpg". Если ширина экрана больше или равна 400 пикселей, будет загружено изображение "medium-image.jpg". Если размер экрана меньше 400 пикселей, будет загружено изображение "small-image.jpg".

Элемент `picture` является полезным инструментом для создания адаптивных веб-сайтов, которые автоматически подстраиваются под различные размеры экранов и различные устройства.

---

[[001 HTML|Назад]]