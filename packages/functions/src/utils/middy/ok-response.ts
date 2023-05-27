import middy from '@middy/core';
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';

export const okResponse = ():
  middy.MiddlewareObj<APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2> => {
  const after: middy.MiddlewareFn<APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2> = async (
    request,
  ): Promise<APIGatewayProxyStructuredResultV2> => {
    const body = request?.response?.body ?? '';

    const response: APIGatewayProxyStructuredResultV2 = {
      statusCode: 200,
      body,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };

    return response;
  };

  return {
    after,
  };
};

export default okResponse;
