---
title: Что такое распределенный компонент?
draft: false
tags:
  - "#React"
  - "#distributed-component"
info:
---
_Распределенный компонент (distributed component)_ - это компонент, который управляет своим внутренним состоянием, а логику рендеринга делегирует другому компоненту.

```tsx
const Menu = () => {
	<Menu>
		<MenuButton>
			Operation <span aria-hidden>*</span>
		</MenuButton>
		<MenuList>
			<MenuItem onSelect={() => alert('DownLoad')}>Download</MenuItem>
			<MenuItem onSelect={() => alert('Copy')}>Copy</MenuItem>
			<MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
		</MenuList>
	</Menu>
}
```

Распределенные компоненты могут быть полезны в случае, когда приложение должно обрабатывать большой объем данных или когда требуется обеспечить высокую производительность и отказоустойчивость.

---

[[004 ReactCore|Назад]]