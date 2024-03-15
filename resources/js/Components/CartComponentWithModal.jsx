import React, { useState } from 'react';
import useCartStore from "../store/cart";
import { useNavigate } from "react-router-dom";

const CartComponentWithModal = (props) => {
  const [products, setProducts, notes, setNotes, priceAll, clearCart] = useCartStore((state) => [
    state.initialCartProducts,
    state.setCartProducts,
    state.notes,
    state.setNotes,
    state.priceAll,
    state.clearCart
  ]);
  const navigate = useNavigate();
  const updateQuantity = (id, delta) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: Math.max(1, product.quantity + delta) };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const toggleModal = () => {
    props.setCartOpen(!props.isCartOpen);
  };

  const handleSubmit = async () => {
    const order = await axios.post('/api/order', {
      products,
      notes
    });
    console.log(order);
    navigate(`/order/${order?.data?.data.id}`);
    props.setCartOpen(false);
    clearCart();
    
  }

  return (
    <div>
      {props.isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            <ul>
              {products.length == 0 &&  'Empty '}
              {products.map((product) => (
                <li key={product.id} className="flex justify-between items-center mb-2">
                  <span>{product.name}</span>
                  <div className="flex items-center">
                    <span className="">{product.price/100}&nbsp;€</span>
                    <button
                      className="px-2 py-1 ml-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{product.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {priceAll()/100}&nbsp;€
            {/* Notes text area */}
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any special instructions here."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <button
              disabled={notes == '' || products.length == 0 }
              className="mt-4 px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={() => handleSubmit()}
            >
              Create order
            </button>
            <button
              className="mt-4  px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponentWithModal;