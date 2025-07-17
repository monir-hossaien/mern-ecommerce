import cookies from "js-cookie";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
// Format date to 'day-month-year'
// export const formatDate = (dateString) => {
//     const options = { timeZone: 'Asia/Dhaka', day: '2-digit', month: '2-digit', year: 'numeric' };
//     return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
// };

// success toast
export const successToast = (message) => {
    toast.success(message);
}

// error toast
export const errorToast = (message) => {
    toast.error(message);
}


export const unauthorized =(code)=>{
    if(code===401){
        cookies.remove("token");
        window.location.href="/login"
    }
}

export const  setEmail = (email) =>{
    sessionStorage.setItem("email",email)
}

export const getEmail =()=>{
    return sessionStorage.getItem("email")
}
// email remove from sessionStorage
export const removeEmail =()=>{
    return sessionStorage.removeItem("email")
}

export  const  TimestampToDate =(timestamp)=> {
    let date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
}

export const  DeleteAlert = async ()=> {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to remove this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}



export const paymentStatusColor = (paymentStatus)=>{
    if(paymentStatus === "Pending"){
        return "bg-warning text-dark";
    }else if(paymentStatus === "Success"){
        return "bg-success text-white";
    }else if(paymentStatus === "Failed"){
        return "bg-danger text-white";
    }else if(paymentStatus === "Cancelled") {
        return "bg-danger text-white";
    }
}