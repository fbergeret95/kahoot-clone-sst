import { Api, StackContext, use } from 'sst/constructs';
import { PostgresStack } from './postgres.stack';
import { CognitoStack } from './cognito.stack';
import * as iam from 'aws-cdk-lib/aws-iam';

export const ApiStack = ({ stack }: StackContext) => {
  const { PostgresDatabase: kahootDb } = use(PostgresStack);
  const { auth } = use(CognitoStack);

  const api = new Api(stack, "Api", {
    authorizers: {
      jwt: {
        type: 'user_pool',
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: 'jwt',
      function: {
        bind: [kahootDb],
      },
    },
    routes: {
      "GET /questions": "packages/functions/src/get-questions.handler",
      "POST /answers": "packages/functions/src/post-answer.handler"
    }
  }
  );

  // Allow api to read and update attributes from authentication
  const policies = [
    new iam.PolicyStatement({
      actions: [
        'cognito-idp:AdminUpdateUserAttributes',
        'cognito-idp:AdminGetUser',
      ],
      effect: iam.Effect.ALLOW,
      resources: [
        auth.userPoolArn,
      ],
    }),
  ];
  api.attachPermissions(policies);

  // Allow authorized users to access this api
  auth.attachPermissionsForAuthUsers(stack, [api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
