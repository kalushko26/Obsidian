____

tags: #React #setState 

links: [Состояние и жизненный цикл](https://ru.reactjs.org/docs/state-and-lifecycle.html) , [Подъем состояния](https://ru.reactjs.org/docs/lifting-state-up.html)

// oldObj нельзя изменять
`oldObj = oldArr[idx];`

// ... но можно скопировать в новый обьект
`newObj = {... oldObj , prop: newValue };`

```jsx
newArr = [... oldArr.slice(0, idx)]
newObj = [...oldArr.slice(idx +1)];
```

_____
## Введение

Часто несколько компонентов должны отражать одни и те же изменяющиеся данные. Мы рекомендуем поднимать общее состояние до ближайшего общего предка. Давайте посмотрим, как это работает.

В этом разделе мы создадим калькулятор температуры, вычисляющий вскипит ли вода при заданной температуре.

Мы начнём с компонента под названием `BoilingVerdict`. Он принимает температуру по шкале Цельсия в качестве пропа `celsius` и выводит, достаточна ли температура для кипения воды:

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Вода закипит.</p>;  
    }
  return <p>Вода не закипит.</p>;
  }
```

Затем мы создадим компонент `Calculator`. Он рендерит `<input>` для ввода температуры и сохраняет её значение в `this.state.temperature`.

Кроме того, он рендерит `BoilingVerdict` для текущего значения поля ввода.

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};  
    }

  handleChange(e) {
    this.setState({temperature: e.target.value});  
    }

  render() {
    const temperature = this.state.temperature;    
    
    return (
      <fieldset>
        <legend>Введите температуру в градусах Цельсия:</legend>
        <input          
	        value={temperature}          
	        onChange={this.handleChange} />        
	    <BoilingVerdict          
		    celsius={parseFloat(temperature)} />      
        </fieldset>
    );
  }
}
```

## Добавление второго поля ввода

Добавим к полю ввода градусов Цельсия поле ввода по шкале Фаренгейта. Оба поля будут синхронизироваться.

Мы можем начать с извлечения компонента `TemperatureInput` из `Calculator`. Добавим в него новый проп `scale`, значением которого может быть либо `"c"` или `"f"`:

```jsx
const scaleNames = {  c: 'Цельсия',  f: 'Фаренгейта'};
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;    
    return (
      <fieldset>
        <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>        
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Теперь можем изменить `Calculator` для рендера двух отдельных полей ввода температуры:

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />        
        <TemperatureInput scale="f" />      
    </div>
    );
  }
}
```

Сейчас у нас есть два поля ввода, но когда вы вводите температуру в одно из них, другое поле не обновляется. Это противоречит нашему требованию — мы хотим их синхронизировать.

Мы также не можем отображать `BoilingVerdict` из `Calculator`. Компонент `Calculator` не знает текущую температуру, потому что она находится внутри `TemperatureInput`.

## Написание функций для конвертации температур

Во-первых, мы напишем две функции для конвертации градусов по шкале Цельсия в Фаренгейт и обратно:

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Эти две функции конвертируют числа. Мы напишем ещё одну функцию, которая принимает строку с температурой (`temperature`) и функцию конвертации (`convert`) в качестве аргументов, и возвращает строку. Мы будем использовать эту функцию для вычисления значения одного поля ввода на основе значения из другого поля ввода.

Данная функция возвращает пустую строку при некорректном значении аргумента `temperature` и округляет возвращаемое значение до трёх чисел после запятой:

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Например, вызов `tryConvert('abc', toCelsius)` возвратит пустую строку, а вызов `tryConvert('10.22', toFahrenheit)` — `'50.396'`.

## Поднятие состояния

В настоящее время оба компонента `TemperatureInput` независимо хранят свои значения каждое в собственном локальном состоянии:

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};  
    }

  handleChange(e) {
    this.setState({temperature: e.target.value});  
    }

  render() {
    const temperature = this.state.temperature;    // ...
```

Однако мы хотим, чтобы эти два поля ввода синхронизировались друг с другом. Когда мы обновляем поле ввода градусов по Цельсию, поле ввода градусов по Фаренгейту должно отражать сконвертированную температуру и наоборот.

В React совместное использование состояния достигается перемещением его до ближайшего предка компонентов, которым оно требуется. Это называется «подъём состояния». Мы удалим внутреннее состояние из `TemperatureInput` и переместим его в `Calculator`.

Если `Calculator` владеет общим состоянием, он становится «источником истины» текущей температуры для обоих полей ввода. Он может предоставить им значения, которые не противоречат друг другу. Поскольку пропсы обоих компонентов `TemperatureInput` приходят из одного и того же родительского компонента `Calculator`, два поля ввода будут всегда синхронизированы.

Давайте шаг за шагом посмотрим, как это работает.

Во-первых, мы заменим `this.state.temperature` на `this.props.temperature` в компоненте `TemperatureInput`. Пока давайте представим, что `this.props.temperature` уже существует, хотя нам нужно будет передать его из `Calculator` в будущем:

```jsx
  render() {
    // Ранее было так: const temperature = this.state.temperature;
    const temperature = this.props.temperature;    // ...
```

Мы знаем, что [пропсы доступны только для чтения](https://ru.reactjs.org/docs/components-and-props.html#props-are-read-only). Когда `temperature` находилась во внутреннем состоянии, `TemperatureInput` мог просто вызвать `this.setState()` для изменения его значения. Однако теперь, когда `temperature` приходит из родительского компонента в качестве пропа, `TemperatureInput` не может контролировать его.

В React это обычно решается путём создания «управляемого» компонента. Точно так же, как DOM-элемент `<input>` принимает атрибуты `value` и `onChange`, так и пользовательский `TemperatureInput` принимает оба пропса `temperature` и `onTemperatureChange` от своего родителя `Calculator`.

Теперь, когда `TemperatureInput` хочет обновить свою температуру, он вызывает `this.props.onTemperatureChange`:

```jsx
  handleChange(e) {
    // Ранее было так: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);    // ...
```

> Примечание:
> В пользовательских компонентах нет особого смысла в именах пропсов `temperature` или `onTemperatureChange`. Мы могли бы назвать их как-то иначе, например, `value` и`onChange`, т. к. подобные имена — распространённое соглашение.

Пропсы `onTemperatureChange` и `temperature` будут предоставлены родительским компонентом `Calculator`. Он будет обрабатывать изменения, модифицируя собственное внутреннее состояние, тем самым повторно отрендеривая оба поля ввода с новыми значениями. Вскоре мы рассмотрим новую реализацию `Calculator`.

Прежде чем изменить `Calculator`, давайте вспомним, что поменялось в компоненте `TemperatureInput`. Мы удалили из него внутреннее состояние, и вместо `this.state.temperature` теперь используем `this.props.temperature`. Вместо вызова `this.setState()`, когда мы хотим изменить состояние, теперь вызываем `this.props.onTemperatureChange()`, который получен от компонента `Calculator`:

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);  }

  render() {
    const temperature = this.props.temperature;    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Введите градусы по шкале {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Теперь перейдём к компоненту `Calculator`.

Мы будем хранить текущие значения `temperature` и `scale` во внутреннем состоянии этого компонента. Это состояние, которое мы «подняли» от полей ввода, и теперь оно будет служить «источником истины» для них обоих. Это минимальное представление всех данных, про которое нам нужно знать для рендера обоих полей ввода.

Например, если мы вводим 37 как значение поля ввода для температуры по шкале Цельсия, состояние компонента `Calculator` будет:

```jsx
{
  temperature: '37',
  scale: 'c'
}
```

Если позднее мы изменим поле для ввода градусов по шкале Фаренгейта на 212, состояние `Calculator` будет:

```jsx
{
  temperature: '212',
  scale: 'f'
}
```

Мы могли бы сохранить значения обоих полей ввода, но это оказалось бы ненужным. Достаточно сохранить значение последнего изменённого поля ввода и шкалу, которая это значение представляет. Затем мы можем вывести значение для другого поля ввода, основываясь только на текущих значениях `temperature` и `scale`.

Поля ввода остаются синхронизированными, поскольку их значения вычисляются из одного и того же состояния:

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});  }

  render() {
    const scale = this.state.scale;    const temperature = this.state.temperature;    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}          onTemperatureChange={this.handleCelsiusChange} />        <TemperatureInput
          scale="f"
          temperature={fahrenheit}          onTemperatureChange={this.handleFahrenheitChange} />        <BoilingVerdict
          celsius={parseFloat(celsius)} />      </div>
    );
  }
}
```

Теперь, независимо от того, какое поле ввода вы редактируете, `this.state.temperature` и `this.state.scale` в `Calculator` обновляются. Одно из полей ввода получает значение как есть, поэтому введённые пользователем данные сохраняются, а значение другого поля ввода всегда пересчитывается на их основе.

Давайте посмотрим, что происходит, когда вы редактируете поле ввода:

-   React вызывает функцию, указанную в `onChange` на DOM-элементе `<input>`. В нашем случае это метод `handleChange()` компонента `TemperatureInput`.
-   Метод `handleChange()` в компоненте `TemperatureInput` вызывает `this.props.onTemperatureChange()` с новым требуемым значением. Его пропсы, включая `onTemperatureChange`, были предоставлены его родительским компонентом — `Calculator`.
-   Когда `Calculator` рендерился ранее, он указал, что `onTemperatureChange` в компоненте `TemperatureInput` по шкале Цельсия — это метод `handleCelsiusChange` в компоненте `Calculator`, а `onTemperatureChange` компонента `TemperatureInput` по шкале Фаренгейта — это метод `handleFahrenheitChange` в компоненте `Calculator`. Поэтому один из этих двух методов `Calculator` вызывается в зависимости от того, какое поле ввода редактируется.
-   Внутри этих методов компонент `Calculator` указывает React сделать повторный рендер себя, используя вызов `this.setState()` со значением нового поля ввода и текущей шкалой.
-   React вызывает метод `render()` компонента `Calculator`, чтобы узнать, как должен выглядеть UI. Значения обоих полей ввода пересчитываются исходя из текущей температуры и шкалы. В этом методе выполняется конвертация температуры.
-   React вызывает методы `render()` конкретных компонентов `TemperatureInput` с их новыми пропсами, переданными компонентом `Calculator`. Он узнает, как должен выглядеть UI.
-   React вызывает метод `render()` компонента `Boiling Verdict`, передавая температуру в градусах Цельсия как проп.
-   React DOM обновляет DOM, чтобы привести его в соответствие с нужными нам значениями в полях ввода. Отредактированное нами только что поле ввода получает его текущее значение, а другое поле ввода обновляется конвертированным значением температуры.

Каждое обновление проходит через одни и те же шаги, поэтому поля ввода остаются синхронизированными.

## Извлечённые уроки

Для любых изменяемых данных в React-приложении должен быть один «источник истины». Обычно состояние сначала добавляется к компоненту, которому оно требуется для рендера. Затем, если другие компоненты также нуждаются в нём, вы можете поднять его до ближайшего общего предка. Вместо того, чтобы пытаться синхронизировать состояние между различными компонентами, вы должны полагаться на [однонаправленный поток данных](https://ru.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down).

Для подъёма состояния приходится писать больше «шаблонного» кода, чем при подходах с двусторонней привязкой данных, но мы получаем преимущество в виде меньших затрат на поиск и изолирование багов. Так как любое состояние «живёт» в каком-нибудь компоненте, и только этот компонент может его изменить, количество мест с возможными багами значительно уменьшается. Кроме того, вы можете реализовать любую пользовательскую логику для отклонения или преобразования данных, введённых пользователем.

Если что-то может быть вычислено из пропсов или из состояния, то скорее всего оно не должно находиться в состоянии. Например, вместо сохранения `celsiusValue` и `fahrenheitValue`, мы сохраняем только последнюю введённую температуру (`temperature`) и её шкалу (`scale`). Значение другого поля ввода можно всегда вычислить из них в методе `render()`. Это позволяет очистить или применить округление к значению другого поля, не теряя при этом точности значений, введённых пользователем.

Когда вы видите, что в UI что-то отображается неправильно, то можете воспользоваться расширением [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools). С помощью него можно проверить пропсы и перемещаться по дереву компонентов вверх до тех пор, пока не найдёте тот компонент, который отвечает за обновление состояния. Это позволяет отследить источник багов:

![Мониторинг состояния в React DevTools](https://ru.reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif)
