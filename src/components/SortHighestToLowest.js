import React, { Component } from 'react';
import {items} from './items'

class SortHighestToLowest extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            items: items
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (event) => {
        let valueBtn = event.target.value
        const item = this.state.items.filter( item => valueBtn === item.name)
        let itemSrc = item[0].src
        let itemName = item[0].name
        let itemPrice = item[0].price
        let itemID = item[0].id
        let itemSize = item[0].size
        this.props.selectedItem(itemSrc, itemName, itemPrice, itemID, itemSize)
    }

    render() {
        return (
            <React.Fragment>
               {
                [].concat(this.props.items)
                .sort( (a,b) => a.price - b.price).reverse()
                .map( (item,index) => {
                    return (
                        item.isActive ? 
                        <div className="item" key={index}>
                            <img src={item.src} className="imageItem"/>
                            <div className="itemName">{item.name}</div>  
                            <div className="itemSize">{item.size}</div>
                            <div className="itemPrice">{item.price}$</div>
                            <button className="btnAddToCart" value={item.name} onClick={this.handleClick}>Add to cart</button>
                        </div>
                        : null
                    )
                }) 
               }
            </React.Fragment>
        );
    }
}

export default SortHighestToLowest;