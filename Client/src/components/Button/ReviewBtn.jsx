import React from 'react';
import {productStore} from "../../store/productStore.js";

const ReviewBtn = (props) => {
    const {isSubmit} = productStore();
    const {className, text, type, onClick, style} = props;

    if(isSubmit === false){
        return  <button onClick={onClick} type={type} className={className} style={style}>{text}</button>
    }else {
        return (
            <button disabled={true} className={className} style={style}><div className="spinner-border spinner-border-sm me-1" role="status"></div></button>
        );
    }
};

export default ReviewBtn;