"use strict";

function BowlingGame() {
    this.NUMBER_OF_PINS = 10;
    this.runningTotal = 0;
    this.recordRollOne = [];
    this.recordRollTwo = [];
    this.scoreboard = [];
    this.frameNumber = 1;
    this.gameOver = false;
}

BowlingGame.prototype.score = function() {
    if (this.frameNumber === 1) {
        return 0;
    } else {
        var r1 = this.recordRollOne.reduce(function(a, b) {
            return a + b;
        });

        var r2 = this.recordRollTwo.reduce(function(a, b) {
            return a + b;
        });
        return r1 + r2;
    }
};

BowlingGame.prototype.rollOne = function(numberOfPins) {
    if (numberOfPins > this.NUMBER_OF_PINS) {
        throw new Error('number of pins cannot exceed 10');
    } else if (this.recordRollTwo.length < this.recordRollOne.length) {
        throw new Error('enter roll 2 to complete current roll');
    } else if (this.gameOver === true) {
        throw new Error('game is over')
    }

    if (numberOfPins === this.NUMBER_OF_PINS) {
        this.recordRollOne.push(numberOfPins);
        this.recordRollTwo.push(null);
        this.updateScore();
        this.nextFrame();
    } else {
        this.recordRollOne.push(numberOfPins);
    }

};

BowlingGame.prototype.rollTwo = function(numberOfPins) {
    var rollOnePins = this.recordRollOne[this.frameNumber - 1];

    if (this.recordRollOne.length <= this.recordRollTwo.length) {
        throw new Error('enter roll one before roll two')
    } else if (numberOfPins > this.NUMBER_OF_PINS) {
        throw new Error('number of pins cannot exceed 10');
    } else if (rollOnePins + numberOfPins > this.NUMBER_OF_PINS) {
        throw new Error('number of pins in frame cannot exceed 10');
    }
    this.recordRollTwo.push(numberOfPins);
    this.updateScore();
    this.nextFrame();
};

BowlingGame.prototype.nextFrame = function() {
    this.frameNumber += 1;
    if (this.frameNumber === 11) {
        this.gameOver = true;
    }
};

BowlingGame.prototype.checkFrame = function(num) {
    return [this.recordRollOne[num - 1], this.recordRollTwo[num - 1]];
};

BowlingGame.prototype.checkRollOne = function() {
    return this.recordRollOne;
};

BowlingGame.prototype.checkRollTwo = function() {
    return this.recordRollTwo;
};

BowlingGame.prototype.updateScore = function() {
    var fnum = this.frameNumber - 1;
    var r1 = this.recordRollOne;
    var r2 = this.recordRollTwo;
    var pnum = this.NUMBER_OF_PINS;

    for (var i = 0; i < this.frameNumber; i++) {

        if (r1[fnum] + r2[fnum] < pnum) {
            this.scoreboard[i] = r1[fnum] + r2[fnum];
        } else if (r1 === pnum && (fnum - i > 2) ) {
            this.scoreboard[i] = r1[fnum] + this.nextTwoRolls(fnum);
        }
    }
};

BowlingGame.prototype.nextTwoRolls = function(k) {
    var r1, r2;
    r1 = this.recordRollOne[k+1];
    if (r1 === 10) {
        r2 = this.recordRollTwo[k+2];
    } else {
        r2 = this.recordRollTwo[k+1];
    }
    return r1+r2;
};
