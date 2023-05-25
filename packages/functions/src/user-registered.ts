
import { PostConfirmationTriggerEvent } from "aws-lambda";
import { createUser } from "@kahoot-clone-sst/core/users"

export const handler = async (event: PostConfirmationTriggerEvent): Promise<PostConfirmationTriggerEvent> => {
  console.info("User confirmed signup", event)

  await createUser({
    username: event.userName,
    sub: event.request.userAttributes.sub,
    email: event.request.userAttributes.email
  });

  return event;
}
