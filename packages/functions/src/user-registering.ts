
import { PreSignUpTriggerEvent } from "aws-lambda";
import { createUser } from "@kahoot-clone-sst/core/users"

export const handler = async (event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> => {
  event.response['autoConfirmUser'] = true;
  event.response['autoVerifyEmail'] = true;

  return event;
}
