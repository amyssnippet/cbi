class TextScript {
  constructor(element, options) {
    this.element = element;
    this.prefix = options.prefix || ''; // Fixed text prefix
    this.strings = options.strings || [];
    this.typeSpeed = options.typeSpeed || 100;
    this.backSpeed = options.backSpeed || 50;
    this.loop = options.loop || false;
    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.typing = true;

    // Create elements for text and blinker
    this.container = document.createElement('span');
    this.blinker = document.createElement('span');
    this.blinker.innerHTML = '|'; // Blinker character

    // Append elements to the main container element
    this.element.appendChild(document.createTextNode(this.prefix));
    this.element.appendChild(this.container);
    this.element.appendChild(this.blinker);

    // Initial style for the blinker (can be overridden later)
    this.setBlinkerStyle({
      display: 'inline',
      animation: 'blink 1s step-end infinite'
    });

    // Start typing animation
    this.type();
  }

  // Method to type out characters
  type() {
    if (this.typing) {
      if (this.currentCharIndex < this.strings[this.currentStringIndex].length) {
        this.container.innerHTML += this.strings[this.currentStringIndex].charAt(this.currentCharIndex);
        this.currentCharIndex++;
        setTimeout(() => this.type(), this.typeSpeed);
      } else {
        this.typing = false;
        setTimeout(() => this.backspace(), this.typeSpeed);
      }
    }
  }

  // Method to delete characters
  backspace() {
    if (!this.typing) {
      if (this.currentCharIndex > 0) {
        this.container.innerHTML = this.strings[this.currentStringIndex].substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        setTimeout(() => this.backspace(), this.backSpeed);
      } else {
        this.typing = true;
        this.currentStringIndex++;
        if (this.loop && this.currentStringIndex >= this.strings.length) {
          this.currentStringIndex = 0;
        }
        setTimeout(() => this.type(), this.typeSpeed);
      }
    }
  }

  // Method to set styles for the blinker
  setBlinkerStyle(styles) {
    Object.assign(this.blinker.style, styles);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-textscript-strings]');
  elements.forEach((element) => {
    const prefix = element.getAttribute('data-textscript-prefix') || '';
    const strings = element.getAttribute('data-textscript-strings').split(',');
    const typeSpeed = parseInt(element.getAttribute('data-textscript-typespeed'), 10) || 100;
    const backSpeed = parseInt(element.getAttribute('data-textscript-backspeed'), 10) || 50;
    const loop = element.getAttribute('data-textscript-loop') === 'true';
    const textScript = new TextScript(element, { prefix, strings, typeSpeed, backSpeed, loop });

    // Example of dynamically changing blinker style after initialization
    textScript.setBlinkerStyle({
      color: 'blue',
      fontWeight: 'bold'
    });
  });
});