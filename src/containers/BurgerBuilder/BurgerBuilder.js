import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios.orders'

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredientsValue) {
        
        const totalSum = Object.keys(ingredientsValue)
        .map(IgElem =>{
            return ingredientsValue[IgElem]
        })
        .reduce((sum,i) => {
           return sum = sum + i
        },0)
        this.setState({purchaseable: totalSum > 0})
    }

    addIngredientsHandler = (type) => {
        const count = this.state.ingredients[type] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = count
        const newPrice = this.state.totalPrice +  INGREDIENTS_PRICE[type]
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientsHandler = (type) => {
        if (this.state.ingredients[type] <=0) {
            return
        }
        const delCount = this.state.ingredients[type] - 1
        const delIngredients = {
            ...this.state.ingredients
        } 
        delIngredients[type] = delCount
        const delPrice = this.state.totalPrice - INGREDIENTS_PRICE[type]
        this.setState({ingredients: delIngredients, totalPrice: delPrice})
        this.updatePurchaseState(delIngredients)

    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        // alert('Continue aayi mone')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Thushar Sreenivas',
                address: {
                   street: 'Test',
                   zipCode: '000000',
                   country: 'India'
                },
            email: 'thusharsreenivas@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/order.json', order)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for ( let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        // {salad: true, meat: false } this is how disabledInfo is shown
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued ={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls 
                price = {this.state.totalPrice}
                ingredientsAdded= {this.addIngredientsHandler}
                ingredientsRemoved= {this.removeIngredientsHandler}
                disabled= {disabledInfo}
                purchaseable = {this.state.purchaseable}
                ordered = {this.purchaseHandler}/>
                
            </Auxiliary>
        )
    }
}

export default BurgerBuilder