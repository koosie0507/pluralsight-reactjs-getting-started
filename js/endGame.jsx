var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="well">
                <h2 className="text-center">{this.props.message}</h2>
                <button className="btn btn-default btn-lg center-block"
                        onClick={this.props.clickPlayAgain}>
                    Play Again?
                </button>
            </div>
        );
    }
});