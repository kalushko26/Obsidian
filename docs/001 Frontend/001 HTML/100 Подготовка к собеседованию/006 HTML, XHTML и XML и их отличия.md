---
title: HTML, XHTML и XML и их отличия?
draft: false
tags:
  - "#HTML"
  - "#XHTML"
  - "#XML"
  - "#SGML"
info:
---
*HTML* - это основной язык разметки для создания веб-страниц. Он использует заранее определенные теги и атрибуты, которые определяют структуру и содержание веб-страницы. *HTML не строго соблюдает стандарты XML, и не поддерживает XML-функции, такие как пространства имен, схемы и валидация.*

*XHTML - это более строгий вариант HTML, который следует стандартам XML.* Он использует те же теги и атрибуты, что и HTML, но требует, чтобы все элементы были правильно вложены и имели закрывающие теги. XHTML поддерживает XML-функции, такие как пространства имен, схемы и валидация.

*XML - это язык разметки, который позволяет создавать пользовательские теги и определять свои собственные правила для их использования.* XML используется для хранения и передачи данных и может использоваться для создания веб-страниц. XML поддерживает XML-функции, такие как пространства имен, схемы и валидация.

Отличия между этими языками разметки:

1. *Строгость:* HTML является менее строгим, чем XHTML и не требует закрывающих тегов, тогда как XHTML требует строгого следования правилам XML и требует закрывающих тегов.
2. *Структура:* XHTML имеет более строгую структуру, чем HTML, и может использоваться для создания более чистого и точного кода.
3. *Поддержка XML:* XHTML и XML поддерживают функции XML, такие как пространства имен, схемы и валидация, в то время как HTML этим не обладает.
4. *Применение:* HTML и XHTML используются для создания веб-страниц, в то время как XML используется для хранения и передачи данных.
5. *Расширяемость:* XML более расширяемый язык, чем HTML и XHTML, поскольку позволяет создавать пользовательские теги и определять свои собственные правила для их использования.

### Введение

И HTML, и XHTML - это языки для создания веб-страниц. 
HTML построен на основе [SGML](https://ru.wikipedia.org/wiki/SGML), а XHTML - на основе [XML](https://ru.wikipedia.org/wiki/XML). 

Они похожи на две стороны одной медали. XHTML был создан из HTML с целью соответствия стандартам XML. Следовательно, XHTML является более строгим по сравнению с HTML и не позволяет отступать от правил написания кода.

Причиной разработки XHTML послужила путаница с некоторыми тегами. 
Страницы, написанные на HTML, выводились в разных браузерах по-разному.

![[Pasted image 20221201200057.png]]

### Обзор HTML и XHTML

#HTML является основным языком разметки веб-страниц. Он создает структурированные документы, выделяя в них такие элементы, как заголовки, списки, ссылки, цитаты и т.д. Это позволяет встраивать изображения и объекты для создания интерактивных форм. HTML задается с помощью тегов в угловых скобках - например, html. Также в его коде могут содержаться скрипты, написанные на #JavaScript.

#XHTML представляет собой семейство языков XML, которые расширяют или продолжают версии HTML. Они не допускают пропусков любых тегов или минимизации атрибутов. XHTML требует, чтобы каждому открывающемуся тегу соответствовал закрывающийся тег в корректном порядке. Например, если в языке гипертекста допускается использование одиночного тега br, то в XHTML в отличие от HTML нужно написать тег br/. В этом и заключается отличие.

### Функции документов HTML и XHTML

Синтаксис HTML состоит из следующих компонентов: открывающий и закрывающий тег, атрибуты элементов (задаваемые в тегах), текстовый и графический контент. HTML-элемент - это все, что находится между тегами, включая сами теги.

Документ XHTML содержит только один корневой элемент. Все элементы, включая переменные, должны быть написаны в нижнем регистре, а присвоенные значения - заключены в кавычки, закрыты и вложены. В XHTML это является обязательным требованием - в отличие от HTML. 
Объявление #DOCTYPE XHTML определяет правила для документов, которым необходимо следовать.

Основной синтаксис HTML допускает использование множества сокращений, чего не допускается в XHTML. Например, элементов, для которых необязательно наличие и открывающегося, и закрывающегося тега. XHTML требует, чтобы все элементы имели и открывающийся, и закрывающийся тег. В то же время XHTML вводит новые сокращения: тег XHTML может быть открыт и закрыт с помощью косой черты (<br/>).

Введение такого синтаксиса, который не используется в объявлениях SGML для HTML 4.01, могло привести к путанице в приложениях на ранних стадиях. Чтобы решить эту проблему, нужно использовать пробел перед закрытием тега

### Спецификация XHTML и HTML

HTML и XHTML могут быть задокументированы совместно. И HTML 4.01, и XHTML 1.0 имеют три подспецификации - строгую, нестрогую и фрэймовую. 

Отличие документов HTML и XHTML заключается в декларировании документов. 
Другие отличия синтаксические. HTML допускает отсутствие закрывающегося тега, пустые элементы без закрывающегося тега. Расширяемый язык разметки гипертекста очень строг в отношении открывающихся и закрывающихся тегов XHTML. Он использует встроенный язык определения функционала атрибутов. Все требования к синтаксису XML соблюдаются в XHTML-документе.

Но эти различия проявляются только тогда, когда XHTML-документ используется как приложение XML; то есть как MIME-типы приложение / XHTML + XML, приложение / XML или текст / XML. Документ XHTML, используемый как MIME-тип текст / HTML должен интерпретироваться как HTML, так что в данном случае применяются правила HTML. CSS, написанный для XHTML, используемого, как MIME-тип текст / HTML, может работать некорректно в документе, который применяется как, как MIME-тип приложение / XHTML + XML. Для получения дополнительной информации о MIME-типах ознакомьтесь с соответствующей документацией.

Это может быть важно, когда вы используете документы XHTML, как текст / HTML. Если не знать о данных различиях, вы можете создать CSS, который не будут работать как ожидается, если документ используется, как XHTML.

Там, где встречаются термины "XHTML" и "XHTML document", предполагается, что в оставшейся части этого раздела они определяют использование разметки XHTML, как MIME-тип XML. XHTML-разметка, используемая в качестве текста / HTML, является HTML-документом.

### Как перейти с HTML на XHTML

В соответствии с рекомендациями W3C для перехода с HTML на XHTML (документы XHTML 1.0) должны быть выполнены следующие шаги:

-   Включите атрибуты xml:lang и lang для элементов, устанавливающих язык;
-   Используйте синтаксис пустого элемента для элементов, указанных в HTML, как пустые;
-   Используйте дополнительный пробел в тегах пустых элементов: <html />;
-   Используйте закрывающиеся теги для элементов, которые могут содержать контент, но являются пустыми: html html
- Не включайте объявление XML.

Если следовать рекомендациям `W3C` по совместимости, то браузер должен уметь интерпретировать документы как HTML, так и XHTML.

Чтобы понять, чем отличается HTML от XHTML, рассмотрим преобразование документа XHTML 1.0 в HTML 4.01. Для этого необходимо выполнить следующие действия:

-   Язык для элемента должен быть указан с помощью атрибута lang, а не атрибута XHTML xml:lang;
-   Удалите пространство имен XML (xmlns=URI). HTML не имеет средств для работы с пространствами имен;
-   Измените объявление типа документа с XHTML 1.0 на HTML 4.01;
-   Удалить объявление XML, если оно присутствует. Как правило, это: 
- <?xml version="1.0" encoding="utf-8"?>;
-   Убедитесь в том, что для MIME-типа документа задано: text/html. И в HTML, и в XHTML, это задается в HTTP-заголовке Content-Type, отправляемом сервером;
-   Измените синтаксис пустого элемента XML на стиль пустого элемента HTML (с br/ на br).

___

 [[001 HTML|Назад]]