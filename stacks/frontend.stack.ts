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
      GATSBY_APP_API_URL: api.url,
      GATSBY_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || '',
      GATSBY_APP_REGION: app.region,
      GATSBY_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      GATSBY_APP_USER_POOL_ID: auth.userPoolId,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
