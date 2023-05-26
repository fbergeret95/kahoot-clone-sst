import * as React from "react";
import Authenticator_Component from "../Components/Authenticator_Component";
import logo from "../images/perficient_logo.png"

const pageStyles = {
    color: "#232129",
    backgroundColor: "#FFFFFF",
    height: "1000px",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const imageStyle = {
    display: "flex",
    margin: "auto"
}


const AuthenticationPage = () => {


    console.log(process.env)
    return (
        <main style={pageStyles}>
            <img style={imageStyle} src={logo} alt="Logo" />
            <Authenticator_Component />
        </main>
    );
};

export default AuthenticationPage