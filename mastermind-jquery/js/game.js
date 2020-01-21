class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameViewModel {
    constructor() {
        this.secret = createSecret();
        this.tries = 0;
        this.moves = [];
        this.counter = 60;
        this.total = 0;
        this.wins = 0;
        this.loses = 0;
        this.avgMoves = 0;
        this.totalMoves = 0;
        this.avgWinsTime = 0;
        this.totalWinsTime = 0;
        this.play = this.play.bind(this);
        this.initGame = this.initGame.bind(this);
        this.countDown = this.countDown.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    play(guess) {
        this.tries++;
        if (guess == this.secret) {
            this.initGame(true);
            this.moves.push(new Move(guess, "You win!"));
        } else {
            let message = this.evaluate(guess);
            this.moves.push(new Move(guess, message));
        }
    }

    initGame(isWin) {
        if (isWin) {
            this.wins++;
            this.totalMoves += this.tries;
            this.avgMoves = this.totalMoves / this.wins;
            this.totalWinsTime += 60 - this.counter;
            this.avgWinsTime =
                this.totalWinsTime / this.wins;
        } else {
            this.loses++;
        }
        this.tries = 0;
        this.moves = [];
        this.secret = createSecret();
        this.counter = 60;
        this.total++;
    }

    countDown() {
        this.counter--;
        if (this.counter <= 0) {
            let move = new Move(this.secret, "You lose!");
            this.initGame(false);
            this.moves.push(move);
        }
    }

    evaluate(guess) {
        let secretAsString = this.secret.toString();
        let guessAsString = guess.toString();
        let perfectMath = 0, partialMatch = 0;
        for (let i = 0; i < secretAsString.length; ++i) {
            let s = secretAsString.charAt(i);
            for (let j = 0; j < guessAsString.length; ++j) {
                let g = guessAsString.charAt(j);
                if (s === g) {
                    if (i === j) {
                        perfectMath++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        if (perfectMath === 0 && partialMatch === 0)
            return "No match";
        let message = "";
        if (partialMatch > 0) message = `-${partialMatch}`;
        if (perfectMath > 0) message += `+${perfectMath}`;
        return message;
    }
}