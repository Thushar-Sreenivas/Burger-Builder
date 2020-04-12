import React, {Component} from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component  {
    componentWillUpdate () {
        console.log( '[OrderSummary] will update')
    }
    render() {
        const ingredientSummary = Object.keys( this.props.ingredients )
        .map( IgKey => {
            return (
                <li>
                    <span style={{ textTransform: 'capitalize' }}>{IgKey}</span>: {this.props.ingredients[IgKey]}
                </li>)
        })
        return (
        <Auxiliary>
            <h3>Order Summary</h3>
            <p>Your delicious burger with ingredient summary are:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h3>Total Price: {this.props.price.toFixed(2)}</h3>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        
        </Auxiliary>
        )
    }
}

export default OrderSummary

