import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/hoc';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinners/Spinner';
import { connect } from 'react-redux'
import * as Action from '../../Store/actions';
class BurgerBuilder extends Component {
    
    componentDidMount() {
        // axios.get('/ingredients.json')
        //         .then(response => {
        //             this.setState({ingredients: response.data})
        //         })
        //         .catch(error => console.error(error))
        
    }

    state = { 
        isPurchasable: false,
        isOrdered: false,
        loading: false
     }
     openModal = () => 
        this.setState({isOrdered: true});
     
     closeModal = () => 
        this.setState({isOrdered: false});
     
     proceedOrder = () => this.props.history.push('/checkout');
     
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
        for(let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0 // {salad: true, bacon: true, cheese: true, meat: true}
        
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
                />
            </Aux>);
            
            showLoader = <OrderSummary 
            ingredients={this.props.ing} 
            closeModal={this.closeModal} 
            proceedOrder={this.proceedOrder} 
            price={this.props.totalPrice}
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
 




const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        totalPrice: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch({type:Action.ADD_INGREDIENT, ingredient: ingredient}),
        removeIngredient: (ingredient) => dispatch({type:Action.REMOVE_INGREDIENT, ingredient: ingredient})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);