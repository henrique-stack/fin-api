import { Statement } from "../../entities/Statement";

export type ITransferValueDTO =
Pick<
  Statement,
  'user_id' |
  'description' |
  'amount' |
  'type' |
  'sender_id'
>