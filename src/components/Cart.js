import React, { Component } from 'react';
import { FaShoppingCart } from 'react-icons/fa'

class Cart extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            displayCart: {
                isActive: false
            }
        }
        this.removeItemFromCart = this.removeItemFromCart.bind(this)
    }
    
    removeItemFromCart = (event) => {
        let valueOfBtn = event.target.value
        this.props.removeItem(valueOfBtn)
    }

    displayCart = () => {
        this.setState( prevState => ({
            displayCart: {
                isActive: !prevState.displayCart.isActive
            }
        }))
    }

    displayThanks = () => {
        this.props.displayThanks()
    }

   

    render() {
        return (
            <React.Fragment >
                <div className="row">
                    <div className="col-md-6 offset-md-3" >
                        <button className="btn btn-dark btn-lg" onClick={this.displayCart} >
                            <FaShoppingCart />
                            <span className="cartLength">{ this.props.cart.length }</span>
                        </button>
                    </div>                  
                </div>

                <div className="row">
                {
                    this.state.displayCart.isActive ?
                    <div id="cartDisplay">
                       <div className="cartItem" >
                        {
                            this.props.cart.length > 0 
                            ? this.props.cart.map( (item,index) => {
                                return (
                                    <div className="row cartRow" key={index}>
                                        <div className="col-md-2 padding-0">
                                            <img src={item.src} className="imgCartItem" />
                                        </div>
                                        <div className="col-md-5 padding-0">
                                            <p className="nameCartItem">{item.name}</p>
                                            <p className="sizeCartItem"><em>Size:  </em><strong>{item.size}</strong></p>
                                        </div>   
                                        <div className="col-md-1 padding-0">
                                            <p className="priceCartItem">{item.price}$</p>
                                        </div>
                                        <div className="col-md-1 offset-md-1 padding-0">
                                            <button value={item.id + index} onClick={this.removeItemFromCart} className="btnRemoveItem">
                                                x
                                            </button>    
                                        </div>
                                        
                                    </div>
                                )
                            })
                            : <p>The cart is empty</p>
                        }    
                        </div> 

                        <div className="cartButtons">
                            <div className="row">
                                <div className="col-md-8 offset-md-2">
                                    <p className="paragraphTotalPrice">
                                        <strong>Total price:</strong> 
                                        <span className="totalPrice">{this.props.totalPrice}$ </span>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <button onClick={this.displayCart} className="btn btn-warning btn-sm">CLOSE</button>
                                </div>
                                <div className="col-md-4">
                                    <button onClick={this.displayThanks} className="btn btn-success btn-sm">BUY</button>
                                </div>
                                <div className="col-md-4">
                                    <button onClick={this.props.clearCart} className="btn btn-danger btn-sm">CLEAR</button>
                                </div>              
                            </div> 
                        </div>   
                    </div>
                    : null    
                }
                </div>
            </React.Fragment>
        );
    }
}

export default Cart;




