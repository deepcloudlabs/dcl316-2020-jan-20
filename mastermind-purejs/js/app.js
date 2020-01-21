let game = new GameViewModel();


window.onload = () => {
    let playBtn = document.querySelector("#playBtn");
    let guess = document.querySelector("#guess");
    let tries = document.querySelector("#tries")
    let moves = document.querySelector("#moves")
    let pbCounter = document.querySelector("#pb-tries")
    let updateView = (model) => {
        tries.innerHTML = model.tries;
        pbCounter.setAttribute("aria-valuenow",
            model.counter);
        pbCounter.setAttribute("style",
            "width: " + (5 * model.counter) / 3 + "%;");
        emptyElement(moves);
        for (let move of model.moves) {
            let row = moves.insertRow();
            let cellGuess = row.insertCell(0);
            let cellMessage = row.insertCell(1);
            cellGuess.appendChild(
                document.createTextNode(move.guess));
            cellMessage.appendChild(
                document.createTextNode(move.message));
        }
    };
    setInterval(() => {
        game.countDown();
        updateView(game);
    }, 1000);
    playBtn.addEventListener('click',
        () => {
            game.play(guess.value);
            updateView(game);
        }, false)
}
