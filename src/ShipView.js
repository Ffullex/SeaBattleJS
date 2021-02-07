// Обрисовка корабля
class ShipView extends ship {
    div = null;

    startX = null;
    startY = null;

    constructor(size, direction, startX, startY) {
        super(size, direction);

        const div = document.createElement("div");
        div.classList.add("ship");

        Object.assign(this, {div, startX, startY})
    }

}