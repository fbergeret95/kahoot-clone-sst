import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import okResponse from "./utils/middy/ok-response";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResult } from "aws-lambda";
import { getQuestions } from "@kahoot-clone-sst/core/questions"

type GetQuestionsRequest = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'>;

const lambda = async (event: GetQuestionsRequest): Promise<APIGatewayProxyResult> => {
  const questions = await getQuestions();
  return {
    statusCode: 200,
    body: JSON.stringify(questions)
  };
}

export const handler = middy(lambda);

handler
  .use(jsonBodyParser())
  .use(okResponse())