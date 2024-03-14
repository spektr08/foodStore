import { create } from 'zustand'
import { quantity, priceAll} from '../lib/orderCalulations'

const loadStateFromLocalStorage = () => {
    const stateFromStorage = localStorage.getItem('cart');
    return stateFromStorage ? JSON.parse(stateFromStorage) : {
        initialCartProducts: [],
        notes: '',
    };
};

const storeData = loadStateFromLocalStorage();

const useCartStore = create((set, get) => ({
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
    }
    ),
    setCartProducts: (products) => set({ initialCartProducts: products }),
    quantity: () => {
        let newInitialCartProducts =  get().initialCartProducts;
        return quantity(newInitialCartProducts)
    },
    priceAll: () => {
        let newInitialCartProducts =  get().initialCartProducts;
        return priceAll(newInitialCartProducts)
    }
}))

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