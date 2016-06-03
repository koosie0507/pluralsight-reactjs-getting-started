var React = require('react');

module.exports = React.createClass({
    render: function () {
        var props = this.props;
        var selectedNumbers = props.selectedNumbers.map(function (number) {
            return (
                <span onClick={props.clickNumber.bind(null, number)}>{number}</span>
            );
        });
        return (
            <div id="answerFrame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        );
    }
});
