// Возвращает случайное число из промежутка
function getRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Возвращает случайное число из массива
function getRandomFrom(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index];
}

// Принимает точку, выясняет, находится ли точка над элементом.
function isUnderPoint(point, element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    const { x, y } = point;

    return left <= x && x <= left + width && top <= y && y <= top + height;
}

//
function addEventListener(element, ...args) {
    element.addEventListener(...args);
    return () => element.removeEventListener(...args);
}

// забор элементов из массива
function getSeveralRandom(array, size){
    array = array.slice();
    if( size > array.length){
        size = array.length;
    }

    const result = [];
    while (result.length < size){
        const index = Math.floor(Math.random() * array.length);
        const item = array.splice(index, 1) [0];
        result.push(item);
    }
/*    const indexes = Array(array.lenght).fill().map((_, i) => i)

    while (result.lenght !== size){
        const
    }*/

    return result;
}