---
title: Как уменьшить размер bundle.js? Сжатие с использованием gZip?
draft: false
tags:
  - "#webpack"
  - "#bundle"
  - "#production-bundle"
  - "#gZip"
  - "#Nginx"
info:
---
Можно произвести сжатие при `deploy`  и использованием `ci/cd` , инструмента `Nginx` и архиватора `gZip` (по уровням от 1 до 9). Он позволяет удалить пробелы, неиспользуемые символы.

Это всё у нас настраивал вроде devOps, тем не менее, такое сжатие имело место быть и условный bundle.js , который весил 150кб стал весить 50кб.

___

[[010 Архитектура Веб-приложений|Назад]]