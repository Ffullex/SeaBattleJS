// Поле боя
    class Battlefield {
    ships = [];
    shots = [];

    #matrix = null;
    #changed = true;

    get matrix() {
        if (!this.#changed) {
            this.#matrix;
        }

        const matrix = [];

        for (let y = 0; y < 10; y++) {
            const row = [];

            for (let x = 0; x < 10; x++) {
                const item = {
                    x,
                    y,
                    ship: null,
                    free: true,
                };

                row.push(item);
            }

            matrix.push(row);
        }

        // Автоматическая постановка корабля при отпускании ЛКМ
        for (const ship of this.ships){
            if(!ship.placed){
                continue;
            }

            const { x, y } = ship;
            const dx = ship.direction === "row";
            const dy = ship.direction === "column";

            // (true * 10 = 10, false * 10 = 0)
            for(let i = 0; i < ship.size; i++){
                const cx = x + dx * i;
                const cy = y + dy * i;

                const item = matrix[cy][cx];
                item.ship = ship;
            }

            // Проверка поля вокруг корабля, где нельзя ставить другие корабли
            for(let y = ship.y - 1; y < ship.y + ship.size * dy + dx + 1; y++){
                for( let x = ship.x - 1; x < ship.x + ship.size * dx + dy + 1; x++){
                    console.log(x, y, this.inField(x, y))
                    if(this.inField(x, y)){
                        const item = matrix[y][x];
                        item.free = false;
                    }
                }
            }
        }

        this.#matrix = matrix;
        this.#changed = false;

        return this.#matrix
    }

    // проверка координат
    inField(x, y){
        const isNumber = n =>
            parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

        if(!isNumber(x) || !isNumber(y)){
            return false;
        }

        return 0 <= x && x < 10 && 0 <= y && y < 10;
    }


    // метод добавления кораблей, который срабатывает, если этот корабль не был добавлен ранее
    addShip(ship, x, y){
        if(this.ships.includes(ship)){
            return false;
        }

        this.ships.push(ship);

        if(this.inField(x, y)){

            const dx = ship.direction === "row"
            const dy = ship.direction === "column"

            let placed = true;

            for(let i = 0; i < ship.size; i++){
                const cx = x + dx * i;
                const cy = y + dy * i;

                if(!this.inField(cx, cy)) {
                    placed = false;
                    break;
                }

                const item = this.matrix[cy][cx]
                if(!item.free){
                    placed = false;
                    break;
                }
            }

            if(placed){
                Object.assign(ship, {x, y});
            }
        }
        this.#changed = true;
        return true;

    }

    // метод удаления кораблей, который срабатывает, если корабль был добавлен ранее
    removeShip(ship){
        if(!this.ships.includes(ship)){
            return false;
        }

        const index = this.ships.indexOf(ship)
        this.ships.splice(index, 1);

        ship.x = null;
        ship.y = null;

        this.#changed = true;
        return true;
    }

    // Пробегаемся по массиву кораблей, удаляем все, возвращаем количество удалённых кораблей
    removeAllShips(){
        const ships = this.ships.slice();

        for (const ship of ships){
            this.removeShip(ship);
        }

        return ships.length;
    }

    addShot(){
        this.#changed = true;
    }

    removeShot(){
        this.#changed = true;
    }

    // Пробегаемся по массиву выстрелов, удаляем их из массива, возвращаем количество удалённых выстрелов
    removeAllShots(){
        const shots = this.shots.slice()

        for (const shot of shots){
            this.removeShot(shot);
        }

        return shots.length;
    }

    randomize() {
        this.removeAllShips();

        for (let size = 4; size >=1; size--){
            for (let n = 0; n < 5 - size; n++){
                // console.log(size);
                const direction = getRandomFrom("row", "column");
                const ship = new Ship(size, direction);

                while(!ship.placed){
                    const x = getRandomBeetween(0, 9);
                    const y = getRandomBeetween(0, 9);
                }
            }
        }
    }
}
