var React = require('react');

module.exports = React.createClass({
    render: function () {
        var disabled, button,
            correct = this.props.correct,
            retryDisabled = this.props.retryCount<1;
        switch (correct) {
            case true:
                button = (
                    <button className="btn btn-success btn-lg" disabled={disabled}
                            onClick={this.props.clickMark}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg" disabled={disabled}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                disabled = this.props.selectedNumbers.length === 0;
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled}
                            onClick={this.props.clickSolve}>
                        =
                    </button>
                );
        }
        return (
            <div id="buttonFrame">
                {button}
                <button className="btn btn-info btn-sm" disabled={retryDisabled}
                        onClick={this.props.clickReset}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    <br></br>
                    {this.props.retryCount}
                </button>
            </div>
        );
    }
});
