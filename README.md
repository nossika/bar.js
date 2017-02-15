# bar.js

Create a bar with a draggable dot or a scalable rect. And drag dot or click bar to get value.

## Examples

	<div id="bar"></div>
	<script src="bar.min.js"></script>
	<script>
		let bar = new Bar(document.querySelector('#bar'), {
			inner_mode: true
		});
		bar.elem.fill.style.cssText = 'background: red';
		bar.render();
		bar.on('change', value => {
			console.log(value)
		});
	</script>

click [demo](https://nossika.github.io/bar.js/demo.html) to try it online.

## Options

|Parameter|Type|Default|Description|
|:-:|:-:|:-:|---|
|default|Number|0|initial value of bar|
|precision|Number|2|number of digits after the decimal point|
|disabled|Boolean|false|whether value can be set by click/drag|
|inner_mode|Boolean|false|whether dot can overflow wrapper|

## Properties

|Propert|Description|
|:-:|---|
|elem|it returns `{dot, fill, wrapper}`, which are native DOM element, could be operated directly|
|value|get - return current value<br>set - set new value & update views|

## Methods

|Method|Description|
|:-:|---|
|render()|render bar|
|on(event, handler)|bind handler to event<br>handler takes two parameters: value, type|
|enable()|enable bar evnets(click/drag)|
|disable()|disable bar events(click/drag)|
|hide_dot()|hide dot|
|show_dot()|show dot|
|hide_fill()|hide fill|
|show_fill()|show fill|

## Tips

* After `new Bar(container)`, the DOM structure would become:

		<div>                      // container
			<div>				   // wrapper
				<div></div>		   // fill
				<div></div>		   // dot
			</div>
		</div>

* We need to set dot/fill style manully because it doesn't has default style.
	
	We could operate it as native DOM element, for example:
		
		bar1.elem.dot.className = 'my-dot';
		bar2.elem.dot.style.background = 'red';
		bar3.elem.dot.style.cssText = 'background: red';

* Remember to execute `render()` after you update dot/fill style!

* Bar could be used on 3 typical scenarios:

	1. range selector
		
			let bar = new Bar(container);
			bar.elem.dot.style.cssText = 'width: 20px; height: 20px; background: red';

	2. progress bar
			
			let bar = new Bar(container, {
				disabled: true
			});
			bar.elem.fill.style.cssText = 'background: red';

	3. scroll bar
		
			let bar = new Bar(container, {
				inner_mode: true
			});
			bar.elem.dot.style.cssText = 'width: 20px; height: 100%; background: red';


