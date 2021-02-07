// Приложение непосредственно
class Application {
    // Данные компоненты должны быть в приложении
    player = null;
    opponent = null;
    mouse = null;

    // доступные сцены и ссылка на активную
    scenes = {};
    activeScene = null;

    constructor(scenes) {
        const mouse = new Mouse(document.body);
        const player = new BattlefieldView();
        const opponent = new BattlefieldView();

        Object.assign(this, { mouse, player, opponent });

        // монтаж игровых полей
        document.querySelector('[data-side="player"]').append(player.root);
        document.querySelector('[data-side="opponent"]').append(opponent.root);

        // Преобазуем в формат entries, чтобы иметь возможность обращаться как к массиву
        // {preparation: PreparationScene,} -> {['preparation', PreparationScene]}
        // То есть, регистрируем сцены из конструктора в банк
        for(const [sceneName, SceneClass] of Object.entries(scenes)){
            this.scenes[sceneName] = new SceneClass(sceneName, this);
        }

        // Собрать с объекта значения
        for(const scene of Object.values(this.scenes)){
            scene.init();
        }
        requestAnimationFrame(()=>this.tick());
    }

    // В том числе задаём обновление сцены с частотой обновления экрана
    tick () {
        requestAnimationFrame(() => this.tick());

        if(this.activeScene){
            this.activeScene.update();
        }

        this.mouse.tick();
    }

    // Несколько проверок и запуск сцены.
    start (sceneName) {
        // Если есть активная сцена и имя совпадает с той, которую нужно запустить
        if(this.activeScene && this.activeScene.name === sceneName){
            return false;
        }

        // Если нет заранее подготовленной сцены (нельзя запустить такую, которой нет)
        if(!this.scenes.hasOwnProperty(sceneName)){
            return false;
        }

        // Если есть текущая активная сцена, её нужно остановить
        if(this.activeScene){
            this.activeScene.stop();
        }

        // Выбор сцены, которую нужно запустить и её запуск.
        const scene = this.scenes[sceneName];
        this.activeScene = scene;
        scene.start();

        return true;
    }
}

/*
const battlefield = new Battlefield;

console.log(battlefield);

*/


/*
const mouse = new Mouse(document.body);

requestAnimationFrame(tick);

function tick() {
    requestAnimationFrame(tick);

    console.log(mouse.left, mouse.pLeft);
    mouse.tick(0);
}*/
