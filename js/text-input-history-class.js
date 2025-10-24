class TextInput {
  constructor() {
    this.history = [];
    this.currentIndex = 0;
  }

  edit(text) {
    if (this.getCurrentState() === text) return;

    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(text);
    this.currentIndex = this.history.length - 1;
  }

  undo() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) this.currentIndex++;
  }

  getCurrentState() {
    return this.history[this.currentIndex];
  }
}

const editor = new TextInput();
editor.edit("First version");
editor.edit("Second version");
editor.edit("Third version");
editor.undo();
editor.undo();
editor.edit("New second version");
editor.undo();
editor.redo();
console.log("Current value: ", editor.getCurrentState());
