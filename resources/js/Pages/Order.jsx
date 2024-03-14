import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { useParams } from 'react-router';
import { quantity, priceAll} from '../lib/orderCalulations'

export default  function Order() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let order_res =  await axios.get(`/api/order/${id}`);
      console.log(order_res);
      setOrder(order_res.data);
      setLoading(false);
    }
    fetchData();
  },[]);

  if(loading) {
    return (<Loader/>);
  }

  return (
    <div className="flex items-center justify-center">
    <div className=" bg-white shadow-md rounded-lg p-4 min-w-[500px]">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <ul className="mb-4">
            {order?.products && order.products.map((product, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                    <span>{product.name} (x{product.quantity})&nbsp;€</span>
                    <span>{(product.price/100) * product.quantity}</span>
                </li>
            ))}
        </ul>
        {order?.notes && (
            <div className="mt-4">
            <h3 className="font-semibold">Notes:</h3>
            <p>{order.notes}</p>
            </div>
        )}
         <div className="flex justify-between font-semibold">
            <span>Adress:</span>
            <span>{order?.user?.adress}</span>
        </div>
        <div className="flex justify-between font-semibold">
            <span>Total Items:</span>
            <span>{quantity(order?.products)}</span>
        </div>
        <div className="flex justify-between font-semibold mt-2">
            <span>Total Price:</span>
            <span>{priceAll(order?.products)/100}&nbsp;€</span>
        </div>
    </div>
    </div>
  )
}