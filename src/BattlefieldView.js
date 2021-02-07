// Поле боя и обрисовка
class BattlefieldView extends Battlefield {

    root = null;    // Всё приложение
    table = null;    // 10х10 поле
    dock = null;    // див - хранилище кораблей дивов
    polygon = null;    // хранилище выстрелов

    cells = [];
    constructor() {
        super();
        const root = document.createElement("div");
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
        root.append(table, dock, polygon)

        for(let y = 0; y < 10; y++){
            const row = [];
            const tr = document.createElement('tr');
            tr.classList.add("battlefield-row");
            tr.dataset.y =y;
            for(let x = 0; x < 10; x++){
                const td = document.createElement('td');
                td.classList.add("battlefield-item");
                Object.assign(td.dataset,{x, y});

                tr.append(td);
                row.push(td);
            }
            table.append(tr);
            this.cells.push[row];
        }
    }
}
