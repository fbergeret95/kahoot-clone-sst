import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import okResponse from "./utils/middy/ok-response";
import errorHandler from "./utils/middy/error-handler";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResult } from "aws-lambda";
import { createAnswer } from "@kahoot-clone-sst/core/answers"

type PostAnswerRequest = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'> & {
  body: {
    question_id: number,
    option_id: number,
    start: string,
    end: string,
  }
};

const lambda = async (event: PostAnswerRequest): Promise<APIGatewayProxyResult> => {
  const claims = event.requestContext.authorizer.jwt.claims;
  const username = (claims['cognito:username'] || claims['username']) as string;
  const game_status = await createAnswer({ ...event.body, username })

  return {
    statusCode: 200,
    body: JSON.stringify(game_status)
  };
}

export const handler = middy(lambda);

handler
  .use(jsonBodyParser())
  .use(errorHandler())
  .use(okResponse())