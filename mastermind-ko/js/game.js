class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameViewModel {
    constructor() {
        this.secret = createSecret();
        this.tries = ko.observable(0);
        this.guess = ko.observable(123);
        this.moves = ko.observableArray([]);
        this.counter = ko.observable(60);
        this.wins = ko.observable(0);
        this.loses = ko.observable(0);
        this.total = ko.computed(() => {
            return this.wins() + this.loses();
        });
        this.totalMoves = ko.observable(0);
        this.avgMoves = ko.computed(() => {
            if (this.wins() == 0) return 0;
            return this.totalMoves() / this.wins();
        });
        this.totalWinsTime = ko.observable(0);
        this.avgWinsTime = ko.computed(() => {
            if (this.wins() == 0) return 0;
            return this.totalWinsTime() / this.wins();
        });
        this.pbWidth = ko.computed(()=>{
            return `${(5 * this.counter())/3}%`;
        })
        this.pbClass = ko.computed(()=>{
           if (this.counter()<=10)
               return "progress-bar progress-bar-danger";
           if (this.counter()<=20)
               return "progress-bar progress-bar-warning";
           return "progress-bar progress-bar-info"
        });
        this.play = this.play.bind(this);
        this.initGame = this.initGame.bind(this);
        this.countDown = this.countDown.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    play() {
        this.tries(this.tries() + 1);
        if (this.guess() == this.secret) {
            this.initGame(true);
            this.moves.push(new Move(this.guess(), "You win!"));
        } else {
            let message = this.evaluate(this.guess());
            this.moves.push(new Move(this.guess(), message));
        }
    }

    initGame(isWin) {
        if (isWin) {
            this.wins(this.wins() + 1);
            this.totalMoves(this.totalMoves()
                + this.tries());
            this.totalWinsTime(
                this.totalWinsTime() + 60
                - this.counter()
            );
        } else {
            this.loses(this.loses() + 1);
        }
        this.tries(0);
        this.moves([]);
        this.secret = createSecret();
        this.counter(60);
    }

    countDown() {
        this.counter(this.counter()-1);
        if (this.counter() <= 0) {
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