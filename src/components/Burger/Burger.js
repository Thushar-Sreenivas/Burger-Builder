import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredient'
const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => { 
        return[...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredients type={igKey} key={igKey + i}/>
            })
        }
    ).reduce((totArr,currValue) => {
        return totArr.concat(currValue)
    },[])
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>
    }
    console.log(transformedIngredients)
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger