const greetablePrototype = {
    greetable: function(greeting) {
      return `${greeting}, ${this.str}!`
    }
}

function createGreetable(str) {
    this.str = str;
    Object.setPrototypeOf(this, greetablePrototype)
    return this;
}

const t = new createGreetable("world");
console.log(t.greetable("hello"))
