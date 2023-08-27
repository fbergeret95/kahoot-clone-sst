import { Cognito, StackContext, use } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import { isProduction } from './utils/env';
import { PostgresStack } from './postgres.stack';

export const CognitoStack = ({ stack, app }: StackContext) => {
  const { PostgresDatabase: kahootDb } = use(PostgresStack);
  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email', 'username', 'preferredUsername'],
    cdk: {
      userPool: {
        // Retain cognito instance in production only
        removalPolicy: isProduction() ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
        // Disable Email confirmation
        selfSignUpEnabled: true,
      },
      userPoolClient: {
        authFlows: {
          // Enable user/password login for easier development cycles
          userPassword: !isProduction(),
          userSrp: true,
        },
      },
    },
    triggers: {
      preSignUp: 'packages/functions/src/user-registering.handler',
      postConfirmation: 'packages/functions/src/user-registered.handler',
    },
    defaults: {
      function: {
        bind: [kahootDb],
      }
    }
  });

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || '',
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
};
