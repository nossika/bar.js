# bar.js

Create a draggable bar that could be used as range selector / progress bar / scroll bar or others.

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
			console.log(value);
		});
	</script>

Click [DEMO](https://nossika.github.io/bar.js/demo.html) to try it!

## Init options

	let bar = new Bar(container, options);

* **container** (required, type: HTMLElement)

* **options** (optional, type: Object)

	* **default** (type: Number, default: 0): initial value of bar
	
	* **precision** (type: Number, default: 2): number of digits after the decimal point
	
	* **disabled** (type: Boolean, default: false): whether value can be set by click/drag
	
	* **inner_mode** (type: Boolean, default: false): whether dot can overflow wrapper

## Properties

	bar.elem; // returns {dot, fill, wrapper}, all of them are HTMLElement.

	bar.value; // return current value;
	bar.value = 0.6; // set value to 0.6;

## Methods


* **render()**

	Render bar.

* **on(event, callback)**

	Bind callback to event.

	events:

	* **change** : callback(value, type)

* **enable()**

	Enable bar evnets(click and drag).

* **disable()**

	Disable bar events(click and drag).

* **hide_dot()**

	Hide dot Element.

* **show_dot()**

	Show dot Element.

* **hide_fill()**

	Hide fill Element.

* **show_fill()**

	Show fill Element.

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


