import axios from "axios";

const PayButton = ({cartItems}) => {
    const url = "http://localhost:3000";
    const user = JSON.parse(sessionStorage.getItem("currentUser"))||{userId:0}
    const handleCheckout = () => {
        axios.post(`${url}/api/stripe/create-checkout-session`, {
            cartItems,
            userId: user.user_id
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url;
            }
        }).catch((err) => console.log(err.message))
    };
    return (
        <>
        <button onClick={() => handleCheckout()}>Check Out</button>
        </>
    )
}

export default PayButton;