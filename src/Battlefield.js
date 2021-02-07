// Поле боя
    class Battlefield {
    ship = [];
    shots = [];

    // метод добавления кораблей, который срабатывает, если этот корабль не был добавлен ранее
    addShip(ship){
        if(this.ships.includes(ship)){
            return false;
        }

        this.ships.push(ship);
        return true;

    }

    // метод удаления кораблей, который срабатывает, если корабль был добавлен ранее
    removeShip(ship){
        if(!this.ships.includes(ship)){
            return false;
        }

        const index = this.ships.indexOf(ship)
        this.ships.splice(index, 1);
        return true;
    }

    // Пробегаемся по массиву кораблей, удаляем все, возвращаем количество удалённых кораблей
    removeAllShips(){
        const ships = this.ships.slice()

        for (const ship of ships){
            this.removeShip(ship);
        }

        return ships.length;
    }

    addShot(){}

    removeShot(){}

    // Пробегаемся по массиву выстрелов, удаляем их из массива, возвращаем количество удалённых выстрелов
    removeAllShots(){
        const shots = this.shots.slice()

        for (const shot of shots){
            this.removeShip(shot);
        }

        return shots.length;
    }
}