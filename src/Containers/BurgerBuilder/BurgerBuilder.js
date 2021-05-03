import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/hoc';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinners/Spinner';


class BurgerBuilder extends Component {
    
    componentDidMount() {
        axios.get('/ingredients.json')
                .then(response => {
                    this.setState({ingredients: response.data})
                })
                .catch(error => console.error(error))
    }

    state = { 
        ingredients: null,
        totalPrice: 0,
        isPurchasable: false,
        isOrdered: false,
        loading: false
     }
     openModal = () => {
        this.setState({isOrdered: true});
     }
     closeModal = () => {
        this.setState({isOrdered: false});
     }
     proceedOrder = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) 
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        
        queryParams.push('price='+this.state.totalPrice)
            const queryString = queryParams.join('&');
            this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
     }
     updatePurchaseInfo = (updatedIngredientList) => {
         const ingredientList = {
             ...updatedIngredientList
         };
         const sum = Object.keys(ingredientList)
                            .map(ing => {
                                return ingredientList[ing]
                            })
                            .reduce((prev,cur) => {
                                return prev + cur;
                            }, 0)
        this.setState({isPurchasable: sum > 0});
     }
     addIngredient = (type) => {
         const newTypeCount = this.state.ingredients[type] + 1;
         const updatedIngredients = {
             ...this.state.ingredients
         };
         updatedIngredients[type] = newTypeCount;
         let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
         this.setState({ingredients: updatedIngredients,totalPrice: newPrice});
         this.updatePurchaseInfo(updatedIngredients)

     }
     removeIngredient = (type) => {
        let newTypeCount = this.state.ingredients[type] - 1;
        
        if(newTypeCount >= 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = newTypeCount;
            let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: updatedIngredients,totalPrice: newPrice});
            this.updatePurchaseInfo(updatedIngredients)
        }
        
     }
     
    render() { 
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0 // {salad: true, bacon: true, cheese: true, meat: true}
        
        let showLoader = null;
        let burger = <Spinner />
        if(this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                AddIngredient={this.addIngredient} 
                RemoveIngredient={this.removeIngredient} 
                disabledInfo={disabledInfo} 
                price={this.state.totalPrice}
                isPurchasable={this.state.isPurchasable}
                isOrdered={this.openModal}
                />
            </Aux>);
            
            showLoader = <OrderSummary 
            ingredients={this.state.ingredients} 
            closeModal={this.closeModal} 
            proceedOrder={this.proceedOrder} 
            price={this.state.totalPrice}
         />
        }
        if(this.state.loading) showLoader = <Spinner />

        
        return ( 
            <Aux>
                <Modal show={this.state.isOrdered} closeModal={this.closeModal}>
                    {showLoader}
                </Modal>
                {burger}
            </Aux>
         );
    }
}
 


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
export default BurgerBuilder;