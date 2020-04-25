import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
import axios from '../../axios.orders'


class BurgerBuilder extends Component{
    state = {
        purchaseable: false,
        purchasing: false,
        
    }
    componentDidMount () {
        console.log(this.props)
        this.props.onInitIngredients()
        
    }
    updatePurchaseState (ingredientsValue) {
        
        const totalSum = Object.keys(ingredientsValue)
        .map(IgElem =>{
            return ingredientsValue[IgElem]
        })
        .reduce((sum,i) => {
           return sum = sum + i
        },0)
        return totalSum > 0    
    }

    // addIngredientsHandler = (type) => {
    //     const count = this.state.ingredients[type] + 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = count
    //     const newPrice = this.state.totalPrice +  INGREDIENTS_PRICE[type]
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientsHandler = (type) => {
    //     if (this.state.ingredients[type] <=0) {
    //         return
    //     }
    //     const delCount = this.state.ingredients[type] - 1
    //     const delIngredients = {
    //         ...this.state.ingredients
    //     } 
    //     delIngredients[type] = delCount
    //     const delPrice = this.state.totalPrice - INGREDIENTS_PRICE[type]
    //     this.setState({ingredients: delIngredients, totalPrice: delPrice})
    //     this.updatePurchaseState(delIngredients)

    // }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for ( let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        // {salad: true, meat: false } this is how disabledInfo is shown
        let orderSummary = null
        
        let burger = this.props.error ? <p>Ingredients not loading</p> : <Spinner />
        if(this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients= {this.props.ings}/>
                    <BuildControls 
                        price = {this.props.price}
                        ingredientsAdded= {this.props.onIngredientAdded}
                        ingredientsRemoved= {this.props.onIngredientRemoved}
                        disabled= {disabledInfo}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}/>
                </Auxiliary>
            )
            orderSummary = <OrderSummary ingredients={this.props.ings}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued ={this.purchaseContinueHandler}
                        price={this.props.price}/>
            
            
                    
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}
const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStatetoProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios))