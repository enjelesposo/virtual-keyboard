const Keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: []
    },

    eventHandlers:{
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');       // keyboard--hidden so hidden default
        this.elements.keyContainer.classList.add('keyboard__keys');
        this.elements.keyContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');

        // Add to DOM
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);
        
        // use keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });

        });
    },

    _createKeys() {     // _ signifies a private function
        const fragment = document.createDocumentFragment();
        const keyLayout  = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach( key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            // Add attributes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch(key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');
                    // add event listener for deleting
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });  

                    break;
                    
                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');
                    // add event listener for capslock
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    }); 

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');
                    // add event listener for new line
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n";
                        this._triggerEvent('oninput');
                    }); 

                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');
                    // add event listener for deleting
                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this._triggerEvent('oninput');
                    }); 

                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');
                    // add event listener for deleting
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    }); 

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {

                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {        // handlerName can be oninput or onclose
        if (typeof this.eventHandlers[handlerName] == 'function'){
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;   // flips the current value of the capslock
        
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){        // means doesn't have an icon inside thefore not an icon
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            };
        };
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');

    }
};

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
})

