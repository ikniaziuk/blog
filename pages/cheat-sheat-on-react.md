---
layout: post
title: Памятка по React
discription: Краткая памятка по React 
pageId: static-page
permalink: /cheat-sheat-on-react
---

## Жизненный цикл компонента

Методы с префиксом ```will```&nbsp;&mdash; вызываются перед каким-либо 
событием,<br /> методы с&nbsp;префиксом ```did```&nbsp;&mdash; после.

<b>Жизненный цикл</b> включает в себя/может включать:

- инициализацию компонента
- обновление компонента (изменение <b>props</b> или <b>state</b>)
- удаление компонента

### Инициализация компонента

Эти методы вызываются в процессе создания и вставки компонета в DOM.
	
Порядок:

- <b>constructor()</b>
-	<b>componentWillMount()</b>
-	<b>render()</b>
-	<b>componentDidMount()</b>

#### constructor()

Вызывается перед первым рендером компонента. Первым в ```constructor()``` объявляется ```super(props)```,
также здесь инициализируется ```state``` компонента и&nbsp;могут биндиться
методы. Если всё вышеперечисленное не объявляется, ```constructor()``` можно опустить. 

{% highlight js %}
constructor(props) {
  super(props);
  this.state = {
    value: ''
  };
  this.handleChange = this.handleChange.bind(this);
}
{% endhighlight %}

#### componentWillMount()

Вызывается непосредственно перед рендером компонента (на клиенте и&nbsp;сервере, 
перед методом ```render()```). Установка ```setState()``` в этом методе не 
приведёт к перерендеру компонента (```render()``` будет видеть обновлённое состояние
и выполнится только один раз).

#### render()

```render()```&nbsp;&mdash; необходимый метод компонента.

При вызове он получает данные из ```this.props``` и ```this.state``` и рендерит 
компонет. Можно возвратить ```null``` или ```false```, чтобы отменить рендер 
компонента.

#### componentDidMount()

Вызывается сразу после рендера компонента. Различные действия, инициализации, теребующие
DOM-узлы, должны идти здесь (интеграция с другими фреймворками, AJAX, таймеры и т.д).
Установка ```state``` в этом методе вызовет перерендер.

### Обновление компонента

Обновление может быть вызвано изменениями  ```props``` и ```state```. Эти методы 
вызываются при перерендеривании компонента.
 
Порядок:
 
 - <b>componentWillReceiveProps()</b>
 - <b>shouldComponentUpdate()</b>
 - <b>componentWillUpdate()</b>
 - <b>render()</b>
 - <b>componentDidUpdate()</b>
 
### componentWillReceiveProps(nextProps)
 
```componentWillReceiveProps()```  вызывается перед тем, как уже существующий компонент получит
новые пареметры(```props```).

Если нужно обновить состояние компонента в ответ на изменения ```props```,
можно  сравнить ```this.props```
и ```nextProps``` и выполнить переход между состояними с помощью ```this.setState``` в этом методе.

В аргументе ```nextProps``` передаётся объект с новыми параметрами. Старые параметры можно получить
через ```this.props```.

{% highlight js %}
componentWillReceiveProps(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
{% endhighlight %}

Не вызывается для первого рендера. Вызов ```this.setState``` в данном методе не вызывает повторного рендеринга.

### shouldComponentUpdate(nextProps, nextState)

Вызывается при изменении параметров или состояния компонента. Не вызывается для начального рендеринга или для
```forceUpdate```.

Возвращает ```true``` (если изменения должны вызывать перерендер компонента) или ```false``` (если 
изменения не влияют на отображение компонента). В данный момент, если возвращается ```false```, то ```render()```, 
```componentWillUpdate``` и ```componentDidUpdate``` 
будет пропущены до следующего изменения состояния. В будущем это поведение может поменяться.

{% highlight js %}
shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id;
}
{% endhighlight %}

Используется для увелечения производительности приложения путём избавления от лишних перерисовок компонента.

### componentWillUpdate(nextProps, nextState)

```componentWillUpdate()```&nbsp;&mdash; вызывается до повторного рендеринга компонента при изменении его
параметров или состояния. Не вызывается для начального рендеринга.

Нельзя использовать ```this.setState``` в этом методе, может произойти зацикливание. Если нужно обновить
состояние в ответ на изменение его параметров лучше использовать ```componentWillRecieveProps()```.

Не вызывается, если ```shouldComponentUpdate``` вернул ```false```.


### componentDidUpdate(prevProps, prevState)

```componentDidUpdate()```&nbsp;&mdash; вызывается сразу после повторного рендеринга при изменении
параметров или состояния компонента. Не вызывается для начального рендеринга. Используется как возможность
работать с DOM, когда компонент обновился.

### Удаление компонента

#### componentWillUnmount

```componentWillUnmount```&nbsp;&mdash; вызывается перед тем, как компонент будет удалён.


 
 



	

