// Возвращает случайное число из промежутка
function getRandomBeetween(min, max){
    return min + Math.floor(Math.random()) * (max - min + 1)
}

// Возвращает случайное число из массива
function getRandomFrom(...args){
    const index = Math.floor(Math.random() * args.length)
    return args[index];
}