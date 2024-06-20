export class TextScript {
  constructor(element, options) {
    this.element = element;
    this.strings = options.strings || [];
    this.typeSpeed = options.typeSpeed || 100;
    this.backSpeed = options.backSpeed || 50;
    this.loop = options.loop || false;
    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.typing = true;
    this.type();
  }

  type() {
    if (this.typing) {
      if (this.currentCharIndex < this.strings[this.currentStringIndex].length) {
        this.element.innerHTML += this.strings[this.currentStringIndex].charAt(this.currentCharIndex);
        this.currentCharIndex++;
        setTimeout(() => this.type(), this.typeSpeed);
      } else {
        this.typing = false;
        setTimeout(() => this.backspace(), this.typeSpeed);
      }
    }
  }

  backspace() {
    if (!this.typing) {
      if (this.currentCharIndex > 0) {
        this.element.innerHTML = this.strings[this.currentStringIndex].substring(0, this.currentCharIndex - 1);
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
}

      
