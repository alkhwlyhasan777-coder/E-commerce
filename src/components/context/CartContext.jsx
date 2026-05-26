
import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
function CartProvider({ children }) {
    // CART
    const [cartItem, setCartItem] = useState(() => {

        const savedCart = localStorage.getItem("cart");
    
        return savedCart
            ? JSON.parse(savedCart)
            : [];
    
    });

    useEffect(() => {
        try {
    
            localStorage.setItem(
                "cart",
                JSON.stringify(cartItem)
            );
    
        } catch (error) {
    
            console.log("LocalStorage Error:", error);
    
        }
    }, [cartItem]);
    
    // HEART
    const [heartItem, setHeartItem] = useState(() => {

        const savedHeart = localStorage.getItem("heart");
    
        return savedHeart
            ? JSON.parse(savedHeart)
            : [];
    
    });
    useEffect(() => {

        localStorage.setItem(
            "heart",
            JSON.stringify(heartItem)
        );
    
    }, [heartItem]);
    // ================= CART =================
    // ADD TO CART
    const addCart = (product) => {
        const exist = cartItem.find(
            (item) => item.id === product.id
        );
        if (exist) {
            setCartItem(
                cartItem.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            );
        } else {
            setCartItem([
                ...cartItem,
                { ...product, quantity: 1 },
            ]);
        }
    };
    // REMOVE PRODUCT
    const removeProduct = (id) => {
        setCartItem(
            cartItem.filter((item) => item.id !== id)
        );
    };
    // TOGGLE CART
    const toggleCart = (product) => {
        const exist = cartItem.find(
            (item) => item.id === product.id
        );
        if (exist) {
            removeProduct(product.id);
        } else {
            addCart(product);
        }
    };
    // INCREASE
    const increaseQuantity = (id) => {
        setCartItem(
            cartItem.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };
    // DECREASE
    const decreaseQuantity = (id) => {
        setCartItem(
            cartItem.map((item) =>
                item.id === id && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            )
        );
    };
    // ================= HEART =================
    // TOGGLE HEART
    const toggleHeart = (product) => {
        const exist = heartItem.find(
            (item) => item.id === product.id
        );
        if (exist) {
            setHeartItem(
                heartItem.filter(
                    (item) => item.id !== product.id
                )
            );
        } else {
            setHeartItem([
                ...heartItem,
                product,
            ]);
        }
    };
    return (
        <CartContext.Provider
            value={{
                // CART
                cartItem,
                addCart,
                removeProduct,
                toggleCart,
                increaseQuantity,
                decreaseQuantity,
                // HEART
                heartItem,
                toggleHeart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;