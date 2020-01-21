let fun = function (x = 0, y = 1, z = 1) {
    return x + y * z;
}
let gun = function (x, y, z) {
    if (arguments.length != 3)
        throw "You should provide three numbers!";
    for (let arg of arguments)
        if (typeof arg != "number")
            throw `${arg} is not a number!`;
    return x + y * z;
}
console.log(gun(1, true, 3))
console.log(fun()) // fun(0,1,1)
console.log(fun(1)) // fun(1,1,1)
console.log(fun(1, 2)) // fun(1,2,1)
console.log(fun(1, 2, 3))
console.log(fun(1, 2, 3, 4))