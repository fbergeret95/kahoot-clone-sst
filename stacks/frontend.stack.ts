// import { StackContext, StaticSite, Table } from "sst/constructs";

// export function FrontendStack({ stack }: StackContext) {

//   const site = new StaticSite(stack, "GatsbySite", {
//     path: "packages/frontend",
//     buildOutput: "public",
//     buildCommand: "npm run build",
//     errorPage: "redirect_to_index_page",
//     environment: {
//       // Pass in the API endpoint to our app
//       GATSBY_APP_API_URL: api.url,
//     },
//   });

//   // Show the URLs in the output
//   stack.addOutputs({
//     SiteUrl: site.url,
//     ApiEndpoint: api.url,
//   });
// }
