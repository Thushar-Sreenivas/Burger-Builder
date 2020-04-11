import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients )
        .map( IgKey => {
            return (
                <li>
                    <span style={{ textTransform: 'capitalize' }}>{IgKey}</span>: {props.ingredients[IgKey]}
                </li>)
        })
    return (
    <Auxiliary>
        <h3>Order Summary</h3>
        <p>Your delicious burger with ingredient summary are:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
    )
}

export default orderSummary

