import React, { useCallback, useEffect, useState } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/hoc';

import Spinner from '../../Components/UI/Spinners/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import {addIngredient,initIngredient,removeIngredient} from '../../Store/actions/burgerbuilder';
import { isPurchased } from '../../Store/actions/order';
import { setAuthRedirectPath } from '../../Store/actions/auth';
const BurgerBuilder = props => {
    const [isOrdered, setIsOrdered] = useState(false);
    
    const dispatch = useDispatch();
    
    const ing = useSelector(state => state.burgerBuilderReducer.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilderReducer.totalPrice);
    const isAuthenticated = useSelector(state => state.authReducer.token !== null);

    const addIngredients = (ingredient) => dispatch(addIngredient(ingredient));
    const removeIngredients = (ingredient) => dispatch(removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(initIngredient()),[dispatch]);
    const isPurchasedHandler = () => dispatch(isPurchased());
    const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients() 
    },[onInitIngredients]);

     const openModal = () => {
         if(isAuthenticated) setIsOrdered(true)
         else {
             onSetAuthRedirectPath('/checkout');
             props.history.push('/auth');
        }
    }
        
     
     const closeModal = () => setIsOrdered(false)
     
     const proceedOrder = () => {
        isPurchasedHandler(); 
        props.history.push('/checkout');
     }
     const updatePurchaseInfo = (updatedIngredientList) => {
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
     
        const disabledInfo = {
            ...ing
        }
        for(let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0 
        
        let showLoader = null;
        let burger = <Spinner />
        if(ing) {
            burger = (<Aux>
                <Burger ingredients={ing}/>
                <BuildControls 
                    AddIngredient={addIngredients} 
                    RemoveIngredient={removeIngredients} 
                    disabledInfo={disabledInfo} 
                    price={totalPrice}
                    isPurchasable={updatePurchaseInfo(ing)}
                    isOrdered={openModal}
                    isAuthenticated = {isAuthenticated}
                />
            </Aux>);
            
            showLoader = <OrderSummary 
                                    ingredients={ing} 
                                    closeModal={closeModal} 
                                    proceedOrder={proceedOrder} 
                                    price={totalPrice}
                                />
        }
        

        
        return ( 
            <Aux>
                <Modal show={isOrdered} closeModal={closeModal}>
                    {showLoader}
                </Modal>
                {burger}
            </Aux>
         );
    
}
 


export default BurgerBuilder;