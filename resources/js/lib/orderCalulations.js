

export const quantity = (newInitialCartProducts) => {
    if(newInitialCartProducts == undefined) {
        return 0;
    }
    let quantity = 0;
        newInitialCartProducts.forEach((element, index) => {
            quantity = quantity + element.quantity;
        });
    return quantity
}


export const priceAll = (newInitialCartProducts) => {
    if(newInitialCartProducts == undefined) {
        return 0;
    }
    let price = 0;
    newInitialCartProducts.forEach((element, index) => {
        price = price + (element.price * element.quantity);
    });
    return price;
}