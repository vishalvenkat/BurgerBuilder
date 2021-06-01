import React, {  useEffect } from 'react';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinners/Spinner';
import { connect } from 'react-redux'
import { fetchOrder } from '../../Store/actions/order';
const Orders = props => {

    const {token, userId, fetchOrder} = props;
    useEffect(() => fetchOrder(token, userId), [token, userId, fetchOrder]);
        let loader = <div>
                        {props.orders.map(order =>
                         <Order 
                                key={order.id}
                                ingredients={order.ingredient} 
                                price={order.price}/>
                        )}
                    </div>

        if(props.loading) loader = <Spinner />
        return (
            <div>
                {loader}
            </div>
         );
    }




const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(fetchOrder(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);