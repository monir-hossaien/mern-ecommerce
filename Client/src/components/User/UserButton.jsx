import React from 'react';
import {userStore} from "../../store/userStore.js";

const UserButton = (props) => {
    const {onClick, type, className, text} = props;
    const {isSubmit} = userStore();

    if(isSubmit === false){
        return  <button onClick={onClick} type={type} className={className}>{text}</button>
    }else {
        return (
            <button disabled={true} className={className}><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
        );
    }
};
export default UserButton;;