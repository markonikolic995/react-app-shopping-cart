import React, { Component } from 'react';
import BtnSize from './BtnSize';
import {items} from './items'
import {buttons} from './buttons'
import SelectForm from './SelectForm';
import SortLowestToHighest from './SortLowestToHighest';
import DisplayDefaultItems from './DisplayDefaultItems';
import SortHighestToLowest from './SortHighestToLowest';
import Cart from './Cart';
import Buy from './Buy';

class Container extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: items,
            buttons: buttons,
            selected: 'select',
            cart:[ ],
            totalPrice:0,
            displayThanks:{
                className:'buyDisabled'
            }

        }

        this.clickHandler = this.clickHandler.bind(this)
        this.displayItems = this.displayItems.bind(this)
        this.findNumberOfProducts = this.findNumberOfProducts.bind(this)
        this.totalPrice = this.totalPrice.bind(this)
    }
    displayItems = (size) => {
        this.state.items.map( item => {
            let itemID = item.id
            if(item.size === size){
                this.setState( prevState => ({
                    items: prevState.items.map( i => {
                        return i.id === itemID ? { ...i , isActive: true} : i
                    })
                }))
            }
            else {
                this.setState( prevState => ({
                    items: prevState.items.map( i => {
                        return i.id === itemID ? { ...i , isActive: false} : i
                    })
                }))
            }
        })
    }

    componentDidMount(){
        setInterval( () => {
            this.findNumberOfProducts()
            this.totalPrice()
        },100)
    }

    findNumberOfProducts = () => {
        const activeProducts = this.state.items.filter( product => product.isActive)
        let numOfProducts = activeProducts.length
        document.getElementById('pNumOfProducts').innerHTML = numOfProducts + " Products(s) find"
    }

    clickHandler = (active, id, size) => {
        if(!active){
            this.setState( prevState => ({
                buttons: prevState.buttons.map( btn => {
                    return btn.id === id ? { ...btn, className:'btnActive', active: true} : {...btn, className:'btnDefault', active:false}
                })
            }))

            this.displayItems(size)

        }
        else{
            this.setState( prevState => ({
                buttons: prevState.buttons.map( btn => {
                    return { ...btn, className:'btnDefault', active: false}
                }),
                items: prevState.items.map( item => {
                    return { ...item, isActive: true}
                })
            }))
        }
    }

    handleSelectedValue = (value) =>{
        this.setState({
            selected: value
        })
    }

    handleSelectedItem = (src, name, price, id, size) => {
            this.setState( prevState => ({
                cart: [
                    ...prevState.cart,{
                    src: src,
                    name: name,
                    price: price,
                    id: id,
                    size: size
                    }
                ]
            }))
    }

    handleRemoveItem = (id) => {
        const newCartArray = this.state.cart.filter( (item,index) => (item.id + index) != id)
        this.setState({
            cart: newCartArray
        })
    }

    clearCart = () => {
        this.setState({
            cart:[]
        })
    }

    totalPrice = () =>{
        const total = this.state.cart.reduce( (tot, item) => tot + item.price, 0);
        this.setState({
            totalPrice: total
        })
    }

    handleDisplayThanks = () => {
        if(this.state.cart.length > 0) {
            this.setState({
                displayThanks:{
                    className: "buyActive"
                }
            })
        }
    }

    handleCloseDisplayThanks = () => {
            this.setState({
                displayThanks:{
                    className: "buyDisabled"
                }
            })
            this.clearCart()
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-2">
                    <div className="sizesDIV">Sizes:</div>
                    <div className="contentSizeButtons">
                    {
                        this.state.buttons.map((btn, index) => {
                            return (
                                <BtnSize 
                                    className={btn.className} 
                                    name={btn.name} 
                                    key={index} 
                                    onClick={this.clickHandler.bind(this, btn.active, btn.id, btn.name)} 
                                />
                            )
                        })
                    }
                    </div>
                </div>

                <div className="col-md-7">
                    <SelectForm selectedValue={this.handleSelectedValue} />
                    <p id="pNumOfProducts"> {items.length} Product(s) find </p>
                    <div className="contentItems">
                    {
                        this.state.selected === 'select' ? <DisplayDefaultItems selectedItem={this.handleSelectedItem} items={this.state.items} />
                        : this.state.selected === 'lowestToHighest' ? <SortLowestToHighest  items={this.state.items} selectedItem={this.handleSelectedItem} />
                        : <SortHighestToLowest selectedItem={this.handleSelectedItem} items={this.state.items} />
                    }
                    </div>
                </div>

                <div className="col-md-3">
                    <Cart displayThanks={this.handleDisplayThanks} totalPrice={this.state.totalPrice} cart={this.state.cart} removeItem={this.handleRemoveItem} clearCart={this.clearCart}  />
                </div>
                <Buy className={this.state.displayThanks.className} closeDisplayThanks={this.handleCloseDisplayThanks} />
            </React.Fragment>
        );
    }
}

export default Container;