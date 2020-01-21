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
        this.play = this.play.bind(this);
        this.initGame = this.initGame.bind(this);
        this.countDown = this.countDown.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    play(guess) {
        this.tries++;
        if (guess == this.secret) {
            this.initGame();
            this.moves.push(new Move(guess, "You win!"));
        } else {
            let message = this.evaluate(guess);
            this.moves.push(new Move(guess, message));
        }
    }

    initGame() {
        this.tries = 0;
        this.moves = [];
        this.secret = createSecret();
        this.counter = 60;
    }

    countDown() {
        this.counter--;
        if (this.counter <= 0) {
            let move = new Move(this.secret, "You lose!");
            this.initGame();
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