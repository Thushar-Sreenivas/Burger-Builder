import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
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
        totalPrice: 4
    }

    addIngredientsHandler = (type) => {
        const count = this.state.ingredients[type] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = count
        const newPrice = this.state.totalPrice +  INGREDIENTS_PRICE[type]
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    removeIngredientsHandler = (type) => {

    }

    render() {
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientsAdded={this.addIngredientsHandler}/>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder