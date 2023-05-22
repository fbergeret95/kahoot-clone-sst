import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import okResponse from "./utils/middy/ok-response";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResult } from "aws-lambda";

type GetQuestionsRequest = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'>;

const lambda = async (event: GetQuestionsRequest): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
}

export const handler = middy(lambda);

handler
  .use(jsonBodyParser())
  .use(okResponse())