class Counter {
    constructor(initValue = 0) {
        this.value = initValue;
    }

    increment() {
        this.value++;
    }

    getValue() {
        return this.value;
    }
}

let counter = new Counter(42);
window.onload = () => {
    let counterSpan = document.querySelector("#counter");
    setInterval(() => {
        counter.increment();
        counterSpan.innerHTML = counter.getValue();
    }, 1000);
}