let game = new GameViewModel();
// setInterval(()=>{ game.play(game.secret); },1)
$(document).ready(() => {
    let playBtn = $("#playBtn");
    let guess = $("#guess");
    let tries = $("#tries");
    let moves = $("#moves");
    let pbCounter = $("#pb-tries");
    let total = $("#total");
    let wins = $("#wins");
    let loses = $("#loses");
    let avgMoves = $("#avgMoves");
    let avgWinsTime = $("#avgWinsTime");
    let updateView = (model) => {
        total.text(model.total);
        wins.text(model.wins);
        loses.text(model.loses);
        avgMoves.text(model.avgMoves);
        avgWinsTime.text(model.avgWinsTime);
        tries.text(model.tries);
        pbCounter.attr("aria-valuenow", model.counter);
        let cssWidth = (5 * model.counter) / 3 + "%";
        pbCounter.css("width", cssWidth);
        moves.empty();
        for (let move of model.moves) {
            moves.append(
                `<tr>
                     <td>${move.guess}</td>
                     <td>${move.message}</td>
                </tr>`
            );
        }
    };
    setInterval(() => {
        game.countDown();
        updateView(game);
    }, 1000);
    playBtn.click(() => {
        game.play(guess.val());
        updateView(game);
    });
});