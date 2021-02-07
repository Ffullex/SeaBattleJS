// Поле боя и обрисовка
class BattlefieldView extends Battlefield {
    // Всё приложение
    root = null;
    // 10х10 поле
    table = null;
    // див - хранилище кораблей дивов
    dock = null;
    // хранилище выстрелов
    polygon = null;

    constructor() {
        super();
        const root = document.createElement('div');
        root.classList.add('battlefield');

        const table = document.createElement('table');
        table.classList.add('battlefield-table')

        const dock = document.createElement('div');
        dock.classList.add('battlefield-dock');

        const polygon = document.createElement('div');
        polygon.classList.add("battlefield-polygon");

/*        this.root = root;
        this.table = table;
        this.dock = dock;
        this.polygon = polygon;*/
        Object.assign(this, { root, table, dock, polygon});
        root.append(table,dock,polygon)

    }
}
