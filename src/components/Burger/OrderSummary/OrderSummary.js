import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'

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
        <p>Your delicious burger with ingredientSummary are:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
    </Auxiliary>
    )
}

export default orderSummary

