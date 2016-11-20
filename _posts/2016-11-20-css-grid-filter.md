---
layout: post
title: 'Знакомьтесь, Css&nbsp;Grid&nbsp;Layout'
description: Простой фильтр на Css Grid
excerpt_separator: <!--more-->
---

Пссс, парень! Я слышал, что ты делаешь раскладку на флексах. Хватит это терпеть. Совсем скоро мы сможем лёгким
движением руки создавать потрясающие раскладки с помощью Css Grid Layout.<!--more-->  Chrome и FF обещают включить
гриды уже в мартовских релизах(
[тык](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hBx1ffTS9CQ/TMTigaDIAgAJ){: target="_blank"},
[тык](https://groups.google.com/forum/#!msg/mozilla.dev.platform/6shk3TZX5vo/avSCrtLCBgAJ){: target="_blank"}), 
так что самое время немного поэксперементировать.

И я «наэксперементировал» простенький фильтр. Я не буду его подробно описывать, потому что в скором времени запилится большой
и годный пост, описывающий все свойства Css Grid Layout. Такой будет только у меня и у Майкла Джексона. 

![Мем с капитаном](/assets/images/oh.jpg)
 
Так что [смотрите сами](http://codepen.io/qleap/full/qqRvRw/){: target="_blank"}, что получилось в итоге. Не забываем, что
модуль ещё нигде не поддерживается, поэтому включаем нужные флаги. 

Краткая Html разметка:

{% highlight html %}
<div class="cards">
  <div class="cards__search search">
    <input id="input" class="search__input" type="text" />
  </div>
  <div class="cards__grid"><!-- Грид контейнер -->
    <div data-title="natural" class="card"> <!-- Грид элемент -->
      <div class="card__title">natural</div> 
    </div> 
    <div data-title="people" class="card"> <!-- Грид элемент -->
      <div class="card__title">people</div>
    </div>
    <!-- ... -->
  </div>
</div>
{% endhighlight %}

Все просто. И постно. У нас есть родительский контейнер `.cards`, в котором мирно покоются два дочерних элемента. 
Из них нас интересует только `.cards__grid`, тут будет происходить вся магия. 

Чтобы включить <b>контекст форматирования гридов</b>(<i>grid formatting context</i>) нужно 
присвоить `.card__grid` `display: grid`.

{% highlight css %}
.card__grid {
  display: grid; /* включаем контекст форматирования гридов */ 
  grid-template-columns: 1fr 1fr 1fr 1fr; /* задаём размеры и количество колонок */
  /* fr --- единица измерения, работает как flex-grow: 1; */
  grid-auto-rows: minmax(150px, auto); /* задаём размеры строк */
  grid-gap: 5px; /* Задаём отступы между блоками */
}
{% endhighlight %}

Ну и наконец, модное расположение блоков:
{% highlight css %}
.card:first-child {
  grid-row: 1/3; /* занимаемое пространство 1-ым дочерним элементом, как видно, он будет занимать 1-ую и 2-ую строки в своей колонке */ 
}

.card:nth-child(8) {
  grid-column: 3/5; /* 8-ой дочерний элемент будет занимать 3 и 4 колонку, а также 2 и 3 строку */
  grid-row: 2/4;
}

{% endhighlight %}

На этом, пожалуй зэ энд. Самое интересное впереди.








