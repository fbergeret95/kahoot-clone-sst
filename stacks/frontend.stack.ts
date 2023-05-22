import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./api.stack";
import { CognitoStack } from './cognito.stack';


export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { auth } = use(CognitoStack);
  const site = new StaticSite(stack, "GatsbySite", {
    path: "packages/frontend",
    buildOutput: "public",
    buildCommand: "npm run build",
    errorPage: "redirect_to_index_page",
    environment: {
      // Pass in the API endpoint to our app
      REACT_APP_API_URL: api.url,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || '',
      REACT_APP_REGION: app.region,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
