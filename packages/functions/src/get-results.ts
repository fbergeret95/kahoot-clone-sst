import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser';
import okResponse from "./utils/middy/ok-response";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResult } from "aws-lambda";
import { getResults } from "@kahoot-clone-sst/core/results"

type GetResultsRequest = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'>;

const lambda = async (event: GetResultsRequest): Promise<APIGatewayProxyResult> => {
  const results = await getResults();
  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
}

export const handler = middy(lambda);

handler
  .use(jsonBodyParser())
  .use(okResponse())