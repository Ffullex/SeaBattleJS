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

    init() {
  //      super.init();
        const { player } = this.app;
        for (const { size, direction, startX, startY } of shipDatas){
            const ship = new ShipView( size, direction, startX, startY );
            player.addShip(ship);
        }

    }
    start() {
        const {player} = this.app;

        player.ships[0].x = 1;
        player.ships[0].y = 1;
        console.log(player.matrix);
        console.log(player);

    }
    update() {
        const {mouse, player} = this.app;

        // Потенциально хотим начать тянуть корабль
        if(!this.draggedShip && mouse.left && !mouse.pLeft){
            const ship = player.ships.find((ship) => ship.isUnder(mouse))
            if(ship){
                const shipRect = ship.div.getBoundingClientRect();

                this.draggedShip = ship;
                this.draggedOffSetX = mouse.x - shipRect.left;
                this.draggedOffSetY = mouse.y - shipRect.top;
            }
        }

        // Перетаскивание
        if(mouse.left && this.draggedShip){
            const { left, top } = player.root.getBoundingClientRect();
            this.draggedShip.div.style.left = `${mouse.x - left - this.draggedOffSetX}px`;
            this.draggedShip.div.style.top = `${mouse.y - top - this.draggedOffSetY}px`;
        }

        // Бросание
        if(!mouse.left && this.draggedShip){
            this.draggedShip = null;
        }

        // Вращение
        if(this.draggedShip && mouse.delta){
            this.draggedShip.toggleDirection();
        }
    }
    stop() {
        console.log("Preparation stop");
    }
}