var React = require('react');

var StarsFrame = React.createClass({
    render: function () {
        var stars = [];
        for (var i = 0; i < this.props.numberOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }

        return (
            <div id="starsFrame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
});

module.exports = StarsFrame;