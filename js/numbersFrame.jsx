var React = require('react');

module.exports = React.createClass({
    render: function () {
        var numbers = [], className,
            clickNumber = this.props.clickNumber,
            selectedNumbers = this.props.selectedNumbers,
            solvedNumbers = this.props.solvedNumbers;

        for (var i = 1; i <= 9; i++) {
            className = "number selected-" + (selectedNumbers.indexOf(i) < 0 ? 'false' : 'true');
            if(solvedNumbers.indexOf(i)>=0) {
                className = className + " solved";
            }
            numbers.push(
                <div className={className} onClick={clickNumber.bind(null, i)}>
                    {i}
                </div>
            );
        }
        return (
            <div id="numbersFrame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});
