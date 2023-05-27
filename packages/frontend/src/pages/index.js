import * as React from "react";
import Authenticator_Component from "../Components/Authenticator_Component";
import { Amplify, Auth } from "aws-amplify";

import logo from "../images/perficient_logo.png";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.GATSBY_APP_REGION,
    userPoolId: process.env.GATSBY_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_APP_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "KahootCloneAPI",
        endpoint: process.env.GATSBY_APP_API_URL,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
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
  margin: "auto",
};

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <img style={imageStyle} src={logo} alt="Logo" />
      <Authenticator_Component />
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
