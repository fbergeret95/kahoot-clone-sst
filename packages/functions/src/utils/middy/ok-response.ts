import middy from '@middy/core';
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2WithLambdaAuthorizer,
} from 'aws-lambda';

type EventType = APIGatewayProxyEventV2WithJWTAuthorizer |
  APIGatewayProxyEventV2WithLambdaAuthorizer<{ pos: { id: string, storeId: string } }>;

export const okResponse = ():
  middy.MiddlewareObj<EventType, APIGatewayProxyStructuredResultV2> => {
  const after: middy.MiddlewareFn<EventType, APIGatewayProxyStructuredResultV2> = async (
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
