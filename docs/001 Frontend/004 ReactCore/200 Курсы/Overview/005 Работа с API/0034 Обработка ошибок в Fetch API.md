---
title: Обработка ошибок в Fetch API
draft: false
tags:
  - "#React"
  - "#fetch"
  - "#error"
---
**1 тип ошибок:** попробовали вызвать сервер , но он недоступен , ->> catch

fetch отклоняет reject promise , только если произошла ошибка сети (сервер недоступен)

Чтобы проверить код результата , можно использовать result.status 
	result.ok содержит true , если result.status содержит один из OK-статусов ( 200 -299 )
	
_____
