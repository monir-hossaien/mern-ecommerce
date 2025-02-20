import React from 'react';
import {wishStore} from "../../store/wishStore.js";

const WishBtn = (props) => {
    const {wishSubmit} = wishStore();
    const {className, text, type, onClick} = props;

    if(wishSubmit === false){
        return  <button onClick={onClick} type={type} className={className}>{text}</button>
    }else {
        return (
            <button disabled={true} className={className}><div className="spinner-border spinner-border-sm" role="status"></div></button>
        );
    }
};

export default WishBtn;