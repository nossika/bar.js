(factory => {
    let root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);
    if (typeof define === 'function' && define.amd) {
        define([], ()=> {
            root.Bar = factory();
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Bar = factory();
    }
})(() => {
    class Bar {
        constructor (container, config = {}) {
            if(!(container instanceof HTMLElement)) return {};
            this._value = config.default || 0;
            this._ori = container.offsetHeight > container.offsetWidth ? 'y' : 'x';
            this._inner_mode = config.inner_mode || false;
            this._hide_dot = config.hide_dot || false;
            this._hide_fill = config.hide_fill || false;
            this._disabled = config.disabled || false;

            let wrapper = document.createElement('div');

            let fill = document.createElement('div');
            wrapper.appendChild(fill);

            let dot = document.createElement('div');

            wrapper.appendChild(dot);
            container.appendChild(wrapper);

            let _origin = {
                client: 0,
                value: 0
            };

            let on_mousedown = (e) => {
                if(this._disabled) return;
                _origin.client = this._ori === 'x' ? e.clientX : e.clientY;
                _origin.value = this._value;
                document.addEventListener('mousemove', on_mousemove);
                document.addEventListener('mouseup', on_mouseup);
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            let on_mousemove = (e) => {
                let value = _origin.value + ((this._ori === 'x' ? e.clientX  - _origin.client : _origin.client - e.clientY)) / (this._bar_len - (!this._inner_mode ? 0 : this._dot_r * 2));
                this.set_value(value, 'drag');
            };
            let on_mouseup = (e) => {
                document.removeEventListener('mousemove', on_mousemove);
                document.removeEventListener('mouseup', on_mouseup);
            };

            dot.addEventListener('mousedown', on_mousedown);
            wrapper.addEventListener('mousedown', (e) => {
                if(this._disabled) return;
                let [offset_x, offset_y] = [e.offsetX, this._bar_len - e.offsetY];
                let target = e.target;
                while(target !== wrapper){
                    offset_x += target.offsetLeft;
                    offset_y -= target.offsetTop;
                    target = target.parentNode;
                }
                let e_offset = this._ori === 'x' ? offset_x : offset_y;
                let value = !this._inner_mode ? e_offset / this._bar_len : (e_offset - this._dot_r) / (this._bar_len - this._dot_r * 2);
                this.set_value(value, 'click');
                on_mousedown(e);
            });

            this.elem = {dot, wrapper, fill};
            this.on_change = null;
            this.render();
        }
        set_value (value, type) {
            if(Object.prototype.toString.call(value) !== '[object Number]') return;
            value = value > 1 ? 1 : (value < 0 ? 0 : value);
            this.elem.dot.style[this._ori === 'x' ? 'left' : 'bottom'] = `calc(${value * 100 * (!this._inner_mode ? 1 : (1 - this._dot_r * 2 / this._bar_len))}% - ${!this._inner_mode ? this._dot_r : 0}px)`;
            this.elem.fill.style[this._ori === 'x' ? 'width' : 'height'] = `${value*100}%`;
            if(this._value !== value) {
                this.on_change && this.on_change(value, type);
            }
            this._value = value;
        };
        render () {
            this._ori = this.elem.wrapper.offsetHeight > this.elem.wrapper.offsetWidth ? 'y' : 'x';
            let wrapper_style = this.elem.wrapper.style;
            wrapper_style.position = 'relative';
            wrapper_style.width = wrapper_style.height = '100%';
            wrapper_style.padding = wrapper_style.margin = '0';
            let fill_style = this.elem.fill.style;
            fill_style.position = 'absolute';
            fill_style.width = fill_style.height = '100%';
            fill_style.left = fill_style.bottom = '0';
            fill_style.padding = fill_style.margin = '0';
            fill_style.display = this._hide_fill ? 'none' : 'block';
            let dot_style = this.elem.dot.style;
            dot_style.position = 'absolute';
            dot_style.left = `calc(50% - ${this.elem.dot.offsetWidth / 2}px)`;
            dot_style.bottom = `calc(50% - ${this.elem.dot.offsetHeight / 2}px)`;
            dot_style.display = this._hide_dot ? 'none' : 'block';
            this._dot_r = (this._ori === 'x' ? this.elem.dot.offsetWidth : this.elem.dot.offsetHeight) / 2;
            this._bar_len = (this._ori === 'x' ? this.elem.wrapper.offsetWidth : this.elem.wrapper.offsetHeight);
            this.set_value(this._value, 'render');
        }
        enable () {
            this._disabled = false;
        }
        disable () {
            this._disabled = true;
        }
        hide_dot () {
            this._hide_dot = true;
            this.render();
        }
        show_dot () {
            this._hide_dot = false;
            this.render();
        }
        hide_fill () {
            this._hide_fill = true;
            this.render();
        }
        show_fill () {
            this._hide_fill = false;
            this.render();
        }
        set value (value) {
            this.set_value(value, 'set')
        }
        get value () {
            return this._value;
        }
    }
    return Bar;
});



