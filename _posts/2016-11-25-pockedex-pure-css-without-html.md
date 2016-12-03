---
layout: post
title: Pockedex с помощью градиентов
discription:  Pockedex на чистом Css без Html 
pageId: article
---

Pockedex на чистом <b>Css</b> без <b>Html</b>.

Увидив прекрасный пен [Pokedex Pure Css](http://codepen.io/mikemang/pen/YpQKMv){: target="_blank"} (Mike Mangialardi),
мне захотелось сделать такой же, но только уже без помощи <b>Html</b>. Да, благодаря  градиентам это возможно.

<p data-height="420" data-theme-id="light" data-slug-hash="QGgQvz" data-default-tab="result" data-user="qleap" data-embed-version="2" data-pen-title="Pockedex Pure Css without Html" class="codepen">Смотреть пен <a href="http://codepen.io/qleap/pen/QGgQvz/">Pockedex Pure Css without Html</a> by qleap (<a href="http://codepen.io/qleap">@qleap</a>) на <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

После того, как пен уже был готов, выяснилось, что <b>FF</b> и <b>Safari</b> не поддерживают такую запись
(указание сторон при позиционировании центра градиента):

{% highlight css %}
.box {
  background: radial-gradient(10em at right 10em bottom 10em, white 50%, blue);
}
{% endhighlight %}

Также нужно быть осторожным с заданием резких цветовых переходов у радиальных градиентов&nbsp;&mdash; в некоторых браузерах
это выглядит коряво. 

