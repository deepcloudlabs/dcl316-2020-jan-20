// let numbers = new Array(23, 8, 16, 42, 15, 4);
let numbers = [23, 8, 16, 42, 15, 4];

let arr = []; // let arr = new Array()
arr.push(23);
arr.push(8);
arr.push(16);
arr.push(42);
arr.push(15);
arr.push(4);

console.log(numbers)
console.log(arr)

// loop #1
for (let i = 0; i < arr.length; ++i)
    console.log(arr[i]);
// loop #2
for (let i in arr)
    console.log(arr[i]);
// loop #3
for (let v of arr)
    console.log(v);
// loop #4
arr.forEach(v => console.log(v))
arr.sort((x, y) => y - x);
console.log(arr)