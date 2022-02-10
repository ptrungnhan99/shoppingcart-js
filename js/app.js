//select element
const shopItemsEl = document.querySelector(".shop-items");
const cartItemsEl = document.querySelector(".cart-items");
const cartTotalEl = document.querySelector(".card-title-amount");

// render Shoes
function renderShoes(){
    shoes.forEach(shoe =>{
        shopItemsEl.innerHTML += `
        <div class="shop-item">
            <div class="shop-item-image" style="background-color: ${shoe.color};">
                <img
                    src="${shoe.image}">
            </div>
            <div class="shop-item-name">${shoe.name}</div>
            <div class="shop-item-description">${shoe.description}</div>
            <div class="shop-item-bottom">
                <div class="shop-item-price">$${shoe.price}</div>
                <div class="shop-item-button" onclick="addToCart(${shoe.id})">
                    <p>ADD TO CART</p>
                </div>
            </div>
        </div>
        `;
    });
};
renderShoes();

//cart
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

//add to cart
function addToCart(id){
    //check if shoe already exist in cart
    if(cart.some(item => item.id === id)){
        changeQuanty("plus",id);
    }else{
        const item = shoes.find(shoe => shoe.id === id);
        cart.push({
            ...item,
            quanty:1
        });
    }
    updateCart();
}

//update cart
function updateCart(){
    renderCartItem();
    renderSubtotal();
    //save cart to localStogare
    localStorage.setItem("CART",JSON.stringify(cart));
}

//remove item cart
function removeItemCart(id){
    
    cart = cart.filter( item => item.id !== id );
    updateCart();
}

//render cart item
function renderCartItem(){
    cartItemsEl.innerHTML = "";
    cart.forEach( item =>{
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-left">
                <div class="cart-item-image" style="background-color: ${item.color};">
                    <div class="cart-item-image-block"><img
                            src="${item.image}">
                    </div>
                </div>
            </div>
            <div class="cart-item-right">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-actions">
                    <div class="cart-item-count">
                        <div class="cart-item-count-button" onclick="changeQuanty('minus',${item.id})">-</div>
                        <div class="cart-item-count-number">${item.quanty}</div>
                        <div class="cart-item-count-button" onclick="changeQuanty('plus',${item.id})">+</div>
                    </div>
                    <div class="cart-item-remove" onclick="removeItemCart(${item.id})"><img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC"
                            class="cart-item-remove-icon"></div>
                </div>
            </div>
        </div>
        `;
    });
}

//renderSubtotal
function renderSubtotal(){
    let totalPrice = 0;
    cart.forEach((item) =>{
        totalPrice += item.price * item.quanty;
    });
    cartTotalEl.innerHTML = totalPrice.toFixed(2);
}

//change quanty of item in cart
function changeQuanty(action,id){
    cart = cart.map(item => {
        let quanty = item.quanty;
        if(item.id ===id){
            if(action === "minus" && quanty > 1){
                quanty--;
            }else if(action == "plus"){
                quanty++;
            }
        }
        return {
            ...item,
            quanty
        }
    });
    updateCart();
}