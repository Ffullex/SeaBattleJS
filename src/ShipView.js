// Обрисовка корабля
class ShipView extends ship {
    div = null;

    constructor(size, direction) {
        super(size, direction);

        const div = document.createElement("div");
        div.classList.add("ship");
    }
}