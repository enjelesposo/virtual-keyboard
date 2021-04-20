const Keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        key: []
    },

    eventHandlers:{
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', '1keyboard--hidden');       // keyboard--hidden so hidden default
        this.elements.keyContainer.classList.add('keyboard__keys');

        // Add to DOM
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {     // _ signifies a private function

    },

    _triggerEvent(handlerName) {        // handlerName can be oninput or onclose
        console.log('Event Triggered! Event Name: ' + handlerName);
    },

    _toggleCapsLock() {
        console.log('Capslock Toggled!');
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
})

