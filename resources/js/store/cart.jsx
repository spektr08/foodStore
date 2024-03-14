import { create } from 'zustand'


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
        let quantity = 0;
        newInitialCartProducts.forEach((element, index) => {
            quantity = quantity + element.quantity;
        });
        return quantity;
    },
    priceAll: () => {
        let newInitialCartProducts =  get().initialCartProducts;
        let price = 0;
        newInitialCartProducts.forEach((element, index) => {
            price = price + (element.price * element.quantity);
        });
        return price;
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