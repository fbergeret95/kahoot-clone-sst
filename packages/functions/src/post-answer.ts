import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import okResponse from "./utils/middy/ok-response";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResult } from "aws-lambda";
import { postAnswer } from "@kahoot-clone-sst/core/answers"

type PostAnswerRequest = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'> & {
  body: {
    question_id: number,
    option_id: number,
    start: string,
    end: string,
  }
};

const lambda = async (event: PostAnswerRequest): Promise<APIGatewayProxyResult> => {
  const alias = event.requestContext.authorizer.jwt.claims.username as string;
  await postAnswer({ ...event.body, alias })

  return {
    statusCode: 200,
    body: JSON.stringify({})
  };
}

export const handler = middy(lambda);

handler
  .use(jsonBodyParser())
  .use(okResponse())