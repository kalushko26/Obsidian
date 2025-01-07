---
title: Как бы вы настроили библиотеки тестирования Jest, RTL для приложения React?
draft: false
tags:
  - testing
  - Jest
  - react-testing-library
---
Для настройки библиотек тестирования `Jest` и `React Testing Library (RTL)` для приложения React, выполните следующие шаги:

1. *Установка зависимостей*

Сначала установите Jest и React Testing Library в качестве зависимостей разработки:

```bash
npm install --save-dev jest @testing-library/react
```

2.  *Создание файла конфигурации Jest*

Создайте файл конфигурации Jest с именем `jest.config.js` в корне вашего проекта. Этот файл будет содержать настройки, которые помогут Jest найти и запустить ваши тесты. Пример базовой конфигурации:

```javascript
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
```

3. *Создание папки для тестов*

Создайте папку с именем `__tests__` в вашем проекте. В этой папке будут храниться все ваши тесты.

4. *Добавление скрипта запуска тестов*

Добавьте скрипт запуска тестов в файл `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

5. *Написание тестов*

Для каждого модуля, который вы хотите протестировать, создайте соответствующий файл с расширением `.test.js` или `.spec.js` внутри папки `__tests__`. В этих файлах напишите свои тесты, используя функции, предоставляемые Jest и RTL, такие как `describe()`, `it()` или `test()`, и `expect()`.

Пример простого теста:

```javascript
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

6. *Запуск тестов*

Теперь вы можете запустить тесты, выполнив команду:
```bash
npm test
```

**Дополнительные советы

- **Mocking**: Jest предоставляет мощные инструменты для создания моков (mock) функций и модулей, что может быть полезно при тестировании.
- **Coverage**: Вы можете настроить Jest для генерации отчетов о покрытии кода тестами, добавив опцию `--coverage` в скрипт запуска тестов.
- **Environment**: Если ваше приложение использует TypeScript, убедитесь, что у вас установлен `ts-jest`, и что конфигурация Jest правильно настроена для обработки TypeScript файлов.

Теперь ваше приложение React настроено для использования Jest и React Testing Library для написания и запуска тестов.

____

[[007 Jest, RTL|Назад]]