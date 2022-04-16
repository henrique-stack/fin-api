import { Statement } from "../../entities/Statement";

export type IValueTransferDTO =
Pick<
  Statement,
  'user_id' |
  'description' |
  'amount' |
  'type' |
  'received_id'
>