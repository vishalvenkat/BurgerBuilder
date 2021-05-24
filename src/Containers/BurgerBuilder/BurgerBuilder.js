import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/hoc';

import Spinner from '../../Components/UI/Spinners/Spinner';
import { connect } from 'react-redux'
import {addIngredient,initIngredient,removeIngredient} from '../../Store/actions/burgerbuilder';
import { isPurchased } from '../../Store/actions/order';
import { setAuthRedirectPath } from '../../Store/actions/auth';
class BurgerBuilder extends Component {
    state = { 
        isOrdered: false,
     }
     componentDidMount () {
         this.props.onInitIngredients();
     }
     openModal = () => {
         if(this.props.isAuthenticated) this.setState({isOrdered: true});
         else {
             this.props.onSetAuthRedirectPath('/checkout');
             this.props.history.push('/auth');
        }
    }
        
     
     closeModal = () => 
        this.setState({isOrdered: false});
     
     proceedOrder = () => {
        this.props.isPurchased(); 
        this.props.history.push('/checkout');
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
        return sum > 0;
     }
    render() { 
        const disabledInfo = {
            ...this.props.ing
        }
        for(let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0 
        
        let showLoader = null;
        let burger = <Spinner />
        if(this.props.ing) {
            burger = (<Aux>
                <Burger ingredients={this.props.ing}/>
                <BuildControls 
                AddIngredient={this.props.addIngredient} 
                RemoveIngredient={this.props.removeIngredient} 
                disabledInfo={disabledInfo} 
                price={this.props.totalPrice}
                isPurchasable={this.updatePurchaseInfo(this.props.ing)}
                isOrdered={this.openModal}
                isAuthenticated = {this.props.isAuthenticated}
                />
            </Aux>);
            
            showLoader = <OrderSummary 
            ingredients={this.props.ing} 
            closeModal={this.closeModal} 
            proceedOrder={this.proceedOrder} 
            price={this.props.totalPrice}
         />
        }
        

        
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
 

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        isAuthenticated : state.authReducer.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredient()),
        isPurchased: () => dispatch(isPurchased()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);