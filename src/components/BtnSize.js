import React, { Component } from 'react';

class BtnSize extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const { name, className, click } = this.props
        return (
            <React.Fragment>
                <button type="submit" className={ className } onClick={this.props.onClick}> { name } </button>
            </React.Fragment>
        );
    }
}

export default BtnSize;