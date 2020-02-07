import React, { Component } from 'react';

class Buy extends Component {

    closeDisplayThanks = () => {
        this.props.closeDisplayThanks()
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="buyThanks">Thank you for buying</div>
                <button onClick={this.closeDisplayThanks} className="buyCloseBtn">Close</button>
            </div>
        );
    }
}

export default Buy;