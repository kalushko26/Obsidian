---
title: Каково значение файлов _error.js и 404.js в каталоге pages и как их можно настроить для обработки ошибок в Next.js?
draft: false
tags:
  - NextJS
  - _error
  - _404
  - pages
info:
  - https://nextjs.org/docs/pages/building-your-application/routing/custom-error
---
В Next.js файлы `_error.js` и `404.js` в каталоге `pages` играют важную роль в обработке ошибок и предоставлении пользовательских страниц ошибок. Давайте рассмотрим их назначение и как их можно настроить.

_error.js

**Назначение:**
- Файл `_error.js` служит универсальным механизмом для обработки необработанных ошибок, возникающих во время рендеринга или выполнения в вашем приложении Next.js.
- Это специальный файл в директории `pages`, который Next.js автоматически вызывает при возникновении ошибок.

**Настройка:**
- Создайте пользовательский файл `_error.js`, чтобы отображать удобную для пользователя страницу ошибки вместо стандартного стека вызовов.
- В компоненте можно получить и отобразить соответствующую информацию об ошибке:
    - `statusCode`: HTTP-код статуса ошибки.
    - `error`: сам объект ошибки.

**Пример:**

```jsx
import React from 'react';

function Error({ statusCode }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>We're working on it. Please try again later.</p>
      {statusCode !== 404 && (
        <p>Status Code: {statusCode}</p>
      )}
    </div>
  );
}

export default Error;
```

404.js

**Назначение:**
- Файл `404.js` специально обрабатывает ошибки 404 Not Found, предоставляя индивидуальный опыт, когда пользователи пытаются получить доступ к несуществующим страницам.

**Настройка:**
- Создайте пользовательский файл `404.js`, чтобы отобразить более информативную или визуально привлекательную страницу 404.
- При необходимости можно реализовать пользовательскую логику для перенаправления пользователей на соответствующие страницы или обработки ошибок 404 по-разному.

**Пример:**

```jsx
import React from 'react';

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <p>Try searching for what you need, or go back to the <a href="/">homepage</a>.</p>
    </div>
  );
}

export default NotFound;
```

Общие подходы к обработке ошибок в Next.js

1. **Использование встроенного компонента Error:**
    - Next.js предоставляет встроенный компонент Error, который перехватывает любые необработанные ошибки и отображает соответствующее сообщение пользователю. Этот компонент можно настроить для отображения различных сообщений об ошибках в зависимости от типа ошибки.
2. **Использование блоков try-catch:**
    - Внутри ваших функций можно использовать блоки try-catch для перехвата ошибок на уровне функции и их соответствующей обработки. Например, если запрос к сети не удался, можно отобразить пользовательскую страницу ошибки или повторить запрос.
3. **Асинхронные операции с async/await и try-catch:**
    - Для асинхронных операций, таких как получение данных из API, рекомендуется использовать async/await с блоками try-catch. Это гарантирует, что любые ошибки, возникающие во время асинхронной операции, будут перехвачены и обработаны правильно.
4. **Использование middleware:**
    - Middleware можно использовать для обработки ошибок в Next.js. Middleware запускается перед обработкой запроса, предоставляя место для перехвата и обработки ошибок на раннем этапе цикла запрос-ответ.

Эти подходы помогают эффективно управлять ошибками в вашем приложении Next.js и обеспечивать лучший пользовательский опыт.

___

[[006 Next.js|Назад]]