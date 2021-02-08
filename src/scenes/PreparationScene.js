const shipDatas = [
    { size: 4, direction: "row", startX: 10, startY: 345 },
    { size: 3, direction: "row", startX: 10, startY: 390 },
    { size: 3, direction: "row", startX: 120, startY: 390 },
    { size: 2, direction: "row", startX: 10, startY: 435 },
    { size: 2, direction: "row", startX: 88, startY: 435 },
    { size: 2, direction: "row", startX: 167, startY: 435 },
    { size: 1, direction: "row", startX: 10, startY: 480 },
    { size: 1, direction: "row", startX: 55, startY: 480 },
    { size: 1, direction: "row", startX: 100, startY: 480 },
    { size: 1, direction: "row", startX: 145, startY: 480 },

];

class PreparationScene extends Scene {
    draggedShip = null;
    draggedOffSetX = 0;
    draggedOffSetY = 0;

    // Расстановка вручную
    init() {
        this.randomize = this.randomize.bind(this);
        this.manually = this.manually.bind(this);

        this.manually();
    }
    start() {

/*        player.ships[0].x = 1;
        player.ships[0].y = 1;
        console.log(player.matrix);
        console.log(player);*/
        document
            .querySelectorAll(".app-actions")
            .forEach((element) => element.classList.add("hidden"));

        document
            .querySelector('[data-scene="preparation"]')
            .classList.remove("hidden");

        const randomizeButton = document.querySelector('[data-action="randomize"]');
        randomizeButton.addEventListener('click',  this.randomize);

        const manuallyButton = document.querySelector('[data-action="manually"]');
        manuallyButton.addEventListener('click',  this.manually);
    }

    stop(){
        const randomizeButton = document.querySelector('[data-action="randomize"]');
        randomizeButton.removeEventListener('click', this.randomize);
    }


    update()  {
        const {mouse, player} = this.app;

        // Потенциально хотим начать тянуть корабль
        if (!this.draggedShip && mouse.left && !mouse.pLeft) {
            const ship = player.ships.find((ship) => ship.isUnder(mouse));

            if (ship) {
                const shipRect = ship.div.getBoundingClientRect();

                this.draggedShip = ship;
                this.draggedOffSetX = mouse.x - shipRect.left;
                this.draggedOffSetY = mouse.y - shipRect.top;

                ship.x = null;
                ship.y = null;
            }
        }

        // Перетаскивание
        if (mouse.left && this.draggedShip) {
            const { left, top } = player.root.getBoundingClientRect();
            const x = mouse.x - left - this.draggedOffSetX;
            const y = mouse.y - top - this.draggedOffSetY;

            this.draggedShip.div.style.left = `${x}px`;
            this.draggedShip.div.style.top = `${y}px`;
        }

        // Бросание
        if (!mouse.left && this.draggedShip) {
            const ship = this.draggedShip;
            this.draggedShip = null;

            const { left, top } = ship.div.getBoundingClientRect();
            const { width, height } = player.cells[0][0].getBoundingClientRect();

            const point = {
                x: left + width / 2,
                y: top + height / 2,
            };

            const cell = player.cells
                .flat()
                .find((cell) => isUnderPoint(point, cell));

            if (cell) {
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);

                player.removeShip(ship);
                player.addShip(ship, x, y);
            } else {
                player.removeShip(ship);
                player.addShip(ship);
            }
            //console.log(cell);
        }


        // Вращение
        if(this.draggedShip && mouse.delta){
            this.draggedShip.toggleDirection();
        }
    }

    // расстановка случайно
    randomize(){
        const {player} = this.app;
        player.randomize(ShipView);

        for ( let i = 0; i < 10; i++ ){
            const ship = player.ships[i];
            ship.startX = shipDatas[i].startX;
            ship.startY = shipDatas[i].startY;
        }
    }

    // расстановка вручную
    manually(){
        const { player } = this.app;

        player.removeAllShips();

        for (const { size, direction, startX, startY } of shipDatas) {
            const ship = new ShipView(size, direction, startX, startY);
            player.addShip(ship);
        }


    }
}