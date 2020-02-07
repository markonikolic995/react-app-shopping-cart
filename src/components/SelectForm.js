import React, { Component } from 'react';

class SelectForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 'select'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit(event){
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
        this.props.selectedValue(event.target.value)
    }

 
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="labelForm">
                    Order by:
                    <select onChange={this.handleChange } value={this.state.value} className="selectForm">
                        <option value="select">Select</option>
                        <option value="lowestToHighest">Lowest to Highest</option>
                        <option value="highestToLowest">Highest to Lowest</option>
                    </select>
                </label>
            </form>
        );
    }
}

export default SelectForm;