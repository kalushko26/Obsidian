---
title: Что такое same-origin policy в контексте JavaScript?
draft: false
tags:
  - "#SOP"
  - "#CORS"
  - "#browser"
info:
---
![[Pasted image 20230703144453.png|600]]

_Same-Origin Policy (`SOP`)_ - это политика безопасности, которая применяется в браузерах и ограничивает доступ JavaScript к ресурсам другого домена. Это означает, что скрипты, загруженные с одного домена, не могут получать доступ к ресурсам, загруженным с другого домена.

_Политика Same-Origin применяется к ресурсам, таким как документы, скрипты, изображения, стили и т.д. Каждый ресурс имеет свой источник (origin), который определяется из протокола, домена и порта. Если два ресурса имеют одинаковый источник, то они считаются "одним и тем же происхождением" (same-origin), и JavaScript может получать доступ к ним без ограничений. Если же ресурсы имеют разные источники, то JavaScript не может получить доступ к ним из соображений безопасности._

Эта политика безопасности важна для защиты пользователей от злоумышленников, которые могут использовать JavaScript для получения доступа к конфиденциальным данным на других сайтах. Например, если злоумышленник создаст сайт-фишинг, похожий на банковский сайт, и загрузит на этом сайте скрипт, который будет пытаться получить доступ к конфиденциальным данным на настоящем банковском сайте, то политика Same-Origin предотвратит этот доступ.

Однако, _иногда возникает необходимость обойти политику Same-Origin, например, для доступа к API другого сайта. Для этого существуют различные методы, такие как JSONP, CORS, и прокси-серверы._ Но их использование должно быть осознанным и ограниченным, чтобы не нарушать безопасность пользователей.

---

[[003 JSCore|Назад]]