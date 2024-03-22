import { create } from 'zustand'
import { quantity, priceAll} from '../lib/orderCalulations'
import { computed } from 'zustand-middleware-computed-state'

const loadStateFromLocalStorage = () => {
    const stateFromStorage = localStorage.getItem('cart');
    return stateFromStorage ? JSON.parse(stateFromStorage) : {
        initialCartProducts: [],
        notes: '',
    };
};

const storeData = loadStateFromLocalStorage();

const useCartStore = create(computed(
    (set) => ({
    initialCartProducts: storeData.initialCartProducts,
    notes: storeData.notes,
    setNotes:(notes) => set({ notes: notes}),
    clearCart: () => set({ notes: '', initialCartProducts: []}),
    setCartProduct:(product) => set((state) => {
        let newInitialCartProducts = [...state.initialCartProducts];
        const foundIndex = state.initialCartProducts.findIndex(e => e.id === product.id);
        if (foundIndex != -1) {
            state.initialCartProducts[foundIndex].quantity++;
            newInitialCartProducts = state.initialCartProducts;
        } else {
            product.quantity = 1;
            newInitialCartProducts.push(product);
        }
        return { initialCartProducts: newInitialCartProducts}
    }),
    setCartProducts: (products) => set({ initialCartProducts: products }),
    }),
    (state) => {
        const quantityCall = () => {
            let newInitialCartProducts =  state.initialCartProducts;
            return quantity(newInitialCartProducts)
        }
        const  priceAllCall = () => {
            let newInitialCartProducts =  state.initialCartProducts;
            return priceAll(newInitialCartProducts)
        }
        return {
          quantity: quantityCall(),
          priceAll: priceAllCall()
        }
    }
    ))

document.addEventListener('visibilitychange', () => {
    const state = useCartStore.getState();
    localStorage.setItem(
        'cart',
        JSON.stringify({
            initialCartProducts: state.initialCartProducts,
            notes: state.notes,
            lastUpdatedAt: new Date()
        })
    );
});


export  default useCartStore;