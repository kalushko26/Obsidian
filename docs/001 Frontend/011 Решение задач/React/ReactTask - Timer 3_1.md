---
title: ReactTask - Timer 3_1
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#Hooks"
  - "#БКС"
---
```
// найти где происходит утечка данных и как это исправить
```


```jsx
import React, { useEffect, useState } from "react";

const useDatetime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
  }, []);

  return now.toLocaleString();
};

const Timer = () => {
  const currentDatetime = useDatetime();

  return <div>{currentDatetime}</div>;
};

const App = () => {
  const [shownDatetime, setShownDatetime] = useState(true);

  return (
    <div>
      <button onClick={() => setShownDatetime(!shownDatetime)}>
        {shownDatetime ? "Hide" : "Show"}
      </button>
      <hr />
      {shownDatetime && <Timer />}
    </div>
  );
};

export default App;
```

___

[[011 Решение задач JS, TS и React|Назад]]