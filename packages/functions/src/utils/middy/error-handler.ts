import middy from '@middy/core';
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
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
  }),
  headers: standardHeaders,
});

export const errorHandler = (): middy.MiddlewareObj<APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2> = async (
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
    if (request.error?.message.includes("Game is not configured yet")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'GameNotConfigured',
          message: 'Game is not configured yet',
        }),
        headers: standardHeaders,
      };
    }
    if (request.error?.message.includes("Game Finished")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'GameFinished',
          message: 'Either there is no more time or the player has answered all the questions',
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
