import { SSTConfig } from "sst";
import { PostgresStack } from "./stacks/postgres.stack";
import { CognitoStack } from "./stacks/cognito.stack";
import { ApiStack } from "./stacks/api.stack";
// import { FrontendStack } from "./stacks/frontend.stack";

export default {
  config(_input) {
    return {
      name: "kahoot-clone-sst",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app
      .stack(PostgresStack)
      .stack(CognitoStack)
      .stack(ApiStack)
    // .stack(FrontendStack);
  }
} satisfies SSTConfig;
