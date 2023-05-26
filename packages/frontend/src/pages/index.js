import * as React from "react";
import Authenticator_Component from "../Components/Authenticator_Component";
import { Amplify, Auth } from 'aws-amplify';
import logo from "../images/perficient_logo.png"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.GATSBY_APP_REGION,
    userPoolId: process.env.GATSBY_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_APP_USER_POOL_CLIENT_ID,
  }
});

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


const IndexPage = () => {


  console.log(process.env)
  return (
    <main style={pageStyles}>
      <img style={imageStyle} src={logo} alt="Logo" />

      <Authenticator_Component />
      {/* <Questions_Page></Questions_Page> */}
      {/* <QuestionZoneComponent></QuestionZoneComponent> */}
      {/* <ul style={listStyles}>
        <li style={docLinkStyle}>
          <a
            style={linkStyle}
            href={`${docLink.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
          >
            {docLink.text}
          </a>
        </li>
        {links.map((link) => (
          <li key={link.url} style={{ ...listItemStyles, color: link.color }}>
            <span>
              <a
                style={linkStyle}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
              >
                {link.text}
              </a>
              {link.badge && (
                <span style={badgeStyle} aria-label="New Badge">
                  NEW!
                </span>
              )}
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul> */}
      {/* CardsZone */}
      {/* <>
        <div className="p-5 text-center">
          <h4>
            Pregunta <strong>2</strong>
          </h4>
          <div className="questionZone py-4">
            <p>Esta es la pregunta Numero 2</p>
          </div>
        </div>
      </> */}
    </main>
  );
};

// const User = [
//   {
//     id: 1,
//     username: "Juanchi",
//     loadPageTime: function () {
//       var loadPageTime = new Date();
//       console.log(loadPageTime + "Test");
//     },
//     timeStampResponse1: "Test",
//   },
// ];

// Contador

var contador = 0;
var contadorElemento = document.getElementById("contador");

// setInterval(function () {
//   contador++;
//   contadorElemento.innerHTML = contador;
// }, 1000);

// Contador

export default IndexPage;

export const Head = () => <title>Home Page</title>;
