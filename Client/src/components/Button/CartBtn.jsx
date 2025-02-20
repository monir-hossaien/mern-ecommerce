import React from 'react';
import {cartStore} from "../../store/cartStore.js";

const CartBtn = (props) => {
    const {cartSubmit} = cartStore();
    const {className, text, type, onClick} = props;

    if(cartSubmit === false){
        return  <button onClick={onClick} type={type} className={className}>{text}</button>
    }else {
        return (
            <button disabled={true} className={className}><div className="spinner-border spinner-border-sm me-1" role="status"></div>Processing...</button>
        );
    }
};

export default CartBtn;