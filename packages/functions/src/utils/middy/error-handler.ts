import middy from '@middy/core';
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyEventV2WithLambdaAuthorizer,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

const standardHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const getServerErrorResponse = (e: unknown): APIGatewayProxyResultV2 => ({
  statusCode: 500,
  body: JSON.stringify({
    // eslint-disable-next-line max-len
    message: 'Internal server error',
    details: e,
  }),
  headers: standardHeaders,
});

type EventType = APIGatewayProxyEventV2WithJWTAuthorizer |
  APIGatewayProxyEventV2WithLambdaAuthorizer<{ pos: { id: string, storeId: string } }>;

export const errorHandler = (): middy.MiddlewareObj<EventType, APIGatewayProxyResultV2> => {
  const onError: middy.MiddlewareFn<EventType, APIGatewayProxyResultV2> = async (
    request,
  ): Promise<APIGatewayProxyResultV2> => {
    if (request.error?.message.includes("duplicate key")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'DuplicateError',
          message: 'Entity already exists',
        }),
        headers: standardHeaders,
      };
    }
    if (request.error?.message.includes("Invalid or malformed JSON")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'BadRequestError',
          message: 'Request must include a body of type JSON.',
        }),
        headers: standardHeaders,
      };
    }

    console.error('Error: ', JSON.stringify(request.error));
    return getServerErrorResponse(request.error);
  };

  return {
    onError,
  };
};

export default errorHandler;
