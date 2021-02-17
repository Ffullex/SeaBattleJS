const app = new Application({
    preparation: PreparationScene,
    computer: ComputerScene,
});

app.start("preparation");

document.querySelector('[ data-action="randomize"]').click();
// автозапуск среднего компа.
/*
document.querySelector('[ data-computer="middle"]').disabled = false;
document.querySelector('[ data-computer="middle"]').click();*/
