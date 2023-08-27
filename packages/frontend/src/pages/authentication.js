import * as React from "react";
import Authenticator_Component from "../Components/Authenticator_Component";
import logo from "../images/perficient_logo.png"


import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const pageStyles = {
    // color: "#232129",
    // backgroundColor: "#FFFFFF",
    // height: "1000px",
    // padding: 96,
    // fontFamily: "-apple-system, Roboto, sans-serif, serif",
};



const AuthenticationPage = () => {


    // console.log(process.env)
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <img  src={logo} alt="Logo" />
                    </div>
                </div>
            </div>
            <Authenticator_Component />
        </main>
    );
};

export default AuthenticationPage