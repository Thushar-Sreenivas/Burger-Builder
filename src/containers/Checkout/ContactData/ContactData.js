import React, { Component } from 'react' 
import Button from '../../../components/UI/Button/Button'
import classes from '../ContactData/ContactData.css'
import axios from '../../../axios.orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { element } from 'prop-types'
class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest'},
                    { value: 'Cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: ''
        }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
            this.setState({ loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false})
            this.props.history.push('/')
        })
        .catch(error => this.setState({ loading: false}))
        console.log(this.props.ingredients)
    }
    eventChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm})
    }
    render () {
        const fromElementsArray = []
        for (let key in this.state.orderForm){
            fromElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form >
                   
                    {fromElementsArray.map(formElement => (
                            <Input 
                            key = {formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            changed={(event) => this.eventChangeHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData