import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import okResponse from "./utils/middy/ok-response";
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResult,
} from "aws-lambda";
import { getQuestions } from "@kahoot-clone-sst/core/questions";
import errorHandler from "./utils/middy/error-handler";

type GetQuestionsRequest = Omit<
  APIGatewayProxyEventV2WithJWTAuthorizer,
  "body"
>;

const lambda = async (
  event: GetQuestionsRequest
): Promise<APIGatewayProxyResult> => {
  const claims = event.requestContext.authorizer.jwt.claims;
  const username =
    (claims["cognito:username"] as string) || (claims["username"] as string);
  const questions = await getQuestions(username);
  return {
    statusCode: 200,
    body: JSON.stringify(questions),
  };
};

export const handler = middy(lambda);

handler.use(jsonBodyParser()).use(errorHandler()).use(okResponse());
