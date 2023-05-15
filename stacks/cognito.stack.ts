import { Cognito, StackContext } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import { isProduction } from './utils/env';

export const CognitoStack = ({ stack, app }: StackContext) => {
  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
    cdk: {
      userPool: {
        // Retain cognito instance in production only
        removalPolicy: isProduction() ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      },
      userPoolClient: {
        authFlows: {
          // Enable user/password login for easier development cycles
          userPassword: !isProduction(),
          userSrp: true,
        },
      },
    },
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
