import mongoose, { Schema } from 'mongoose';
import { object, string,number, TypeOf } from "zod";


export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "First name is required",
    }).min(3, "Name is too short - should be min 6 chars").max(18,"should be max 18 chars"),
  })
});

export const depositSchema = object({
  body: object({
    accountNo: string({
      required_error: "accountNo is required",
    }).nonempty({ message: "accountNo Can't be empty" }),
    amount: number({
      required_error: "amount is required",
    }).int({ message: "amount Expected number" }),
  })
});


export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type DepositUserInput = TypeOf<typeof depositSchema>["body"];


export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId:{type: String}
},
{
    timestamps: true,
});


export default mongoose.model('User', UserSchema);


