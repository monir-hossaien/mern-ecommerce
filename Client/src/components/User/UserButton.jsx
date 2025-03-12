import React from 'react';
import {userStore} from "../../store/userStore.js";

const UserButton = (props) => {
    const {onClick, type, className, text, style} = props;
    const {isSubmit} = userStore();

    if(isSubmit === false){
        return  <button onClick={onClick} type={type} className={className} style={style}>{text}</button>
    }else {
        return (
            <button disabled={true} className={className} style={style}><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
        );
    }
};
export default UserButton;;