import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinners/Spinner';
class Orders extends Component {
    state = { 
        orders: [],
        loading:true
     }
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                this.setState({loading: false})
                let fetchedData = [];
                for(let key in response.data) {
                    fetchedData.push({
                        id: key,
                        ...response.data[key]
                    })
                }
                //console.log(fetchedData);
                this.setState({orders: fetchedData});
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }
    render() { 
        let loader = <div>
                        {this.state.orders.map(order => 
                         <Order key={order.id} ingredients={order.ingredient} price={order.price}/>
                        )}
                    </div>

        if(this.state.loading) <Spinner />
        return ( 
            <div>
                {loader}
            </div>
         );
    }
}
 
export default Orders;