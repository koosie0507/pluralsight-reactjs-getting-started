var React = require('react');
var ReactDOM = require('react-dom');

var StarsFrame = require('./starsFrame');
var ButtonFrame = require('./buttonFrame');
var AnswerFrame = require('./answersFrame');
var NumbersFrame = require('./numbersFrame');
var EndGame = require('./endGame');

function _computeNewRandom() {
    return Math.floor(Math.random() * 9) + 1;
}

function _possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return _possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
}

var Game = React.createClass({
    getInitialState: function () {
        return {
            numberOfStars: _computeNewRandom(),
            selectedNumbers: [],
            solvedNumbers: [],
            correct: null,
            retryCount: 5,
            goodByeMessage: null
        };
    },
    selectNumber: function (clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.solvedNumbers.indexOf(clickedNumber) < 0) {
            this.setState(
                {
                    selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                    correct: null
                }
            );
        }
    },
    deselectNumber: function (clickedNumber) {
        var selectedNumbers = this.state.selectedNumbers;
        var index = selectedNumbers.indexOf(clickedNumber);
        if (index < 0) {
            return;
        }
        selectedNumbers.splice(index, 1);
        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
    },
    sumOfSelectedNumbers: function () {
        return this.state.selectedNumbers.reduce(function (p, n) {
            return p + n;
        }, 0);
    },
    checkAnswer: function () {
        var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        console.log('correct = ' + correct);
        this.setState({
            correct: correct
        });
    },
    _checkCombinations: function() {
        var arr = [];
        for(var i=1;i<=9;i++) {
            if(this.state.solvedNumbers.indexOf(i)<0) {
                arr.push(i);
            }
        }
        return _possibleCombinationSum(arr, this.state.numberOfStars);
    },
    checkGame: function () {
        if (this.state.solvedNumbers.length === 9) {
            this.setState({
                goodByeMessage: 'Good game!'
            });
            return;
        }
        if(this.state.retryCount < 1 && !this._checkCombinations()) {
            this.setState({
                goodByeMessage: "Oh noes! We lossst!"
            })
        }
    },
    markSolution: function () {
        var solved = this.state.solvedNumbers;
        this.setState({
            correct: null,
            solvedNumbers: solved.concat(this.state.selectedNumbers),
            selectedNumbers: [],
            numberOfStars: _computeNewRandom()
        }, this.checkGame);
    },
    playAgain: function () {
        this.replaceState(this.getInitialState());
    },
    resetAnswer: function () {
        this.setState({
            correct: null,
            numberOfStars: _computeNewRandom(),
            selectedNumbers: [],
            retryCount: this.state.retryCount - 1
        }, this.checkGame);
    },
    _getBottomFrame: function () {
        if (this.state.goodByeMessage) {
            return (
                <EndGame
                    message={this.state.goodByeMessage}
                    clickPlayAgain={this.playAgain}/>
            );
        } else {
            return (
                <NumbersFrame
                    selectedNumbers={this.state.selectedNumbers}
                    solvedNumbers={this.state.solvedNumbers}
                    clickNumber={this.selectNumber}/>
            );
        }

    },
    render: function () {
        return (
            <div id="game">
                <h1>Play nine</h1>
                <hr />
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars}/>
                    <ButtonFrame
                        selectedNumbers={this.state.selectedNumbers}
                        correct={this.state.correct}
                        retryCount={this.state.retryCount}
                        clickReset={this.resetAnswer}
                        clickSolve={this.checkAnswer}
                        clickMark={this.markSolution}/>
                    <AnswerFrame
                        selectedNumbers={this.state.selectedNumbers}
                        clickNumber={this.deselectNumber}/>
                </div>
                {this._getBottomFrame()}
            </div>
        );
    }
});

ReactDOM.render(<Game />, document.getElementById('container'));