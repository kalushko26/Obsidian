---
title: Расскажите про свойство `display` в CSS
draft: false
tags:
  - "#CSS"
  - "#display"
info:
---
![[Pasted image 20230704030110.png|600]]

*Свойство `display`* в CSS определяет, как элемент должен быть показан на странице. Оно позволяет управлять тем, как элемент отображается в потоке документа, каков его размер и каким образом он реагирует на другие элементы на странице.

Некоторые из наиболее распространенных значений свойства `display` в CSS:

1. `block` - элемент отображается как блочный элемент. Он занимает всю доступную ширину и обычно начинается с новой строки. Примерами блочных элементов являются `div`, `p`, `h1`, `form`.
2. `inline` - элемент отображается как строчный элемент. Он не прерывает текущую строку и занимает только ту ширину, которая необходима для отображения его содержимого. Примерами строчных элементов являются `span`, `a`, `img`.
3. `inline-block` - элемент отображается как строчный элемент, но его содержимое можно располагать как у блочного элемента. Примерами таких элементов являются `button`, `input`, `select`.
   Из всех строчных элементов по умолчанию значение `inline-block` имеет только `<img>`. Однако, любой элемент может быть принудительно сделан `inline-block` с помощью CSS-свойства `display`.
4. `none` - элемент скрывается и не занимает места на странице.
5. `flex` - элемент отображается с использованием гибкой модели блоков. Он может растягиваться и сжиматься, чтобы занимать доступное пространство.
6. `grid` - элемент отображается с использованием сетки. Он может быть разбит на ячейки, чтобы располагать содержимое внутри них.
7. `table` - элемент отображается как таблица. Он может содержать строки и ячейки, подобно HTML-таблице.

Свойство `display` может использоваться для создания различных макетов и стилей для элементов на странице, в зависимости от их роли и функций. Кроме того, оно может быть изменено с помощью медиазапросов, что позволяет создавать адаптивные макеты для разных устройств и экранов.

---

[[002 CSS|Назад]]