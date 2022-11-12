import mongoose, { Schema } from 'mongoose';
import { object, string, TypeOf } from "zod";


export const createUserSchema = object({
  // In this example we will only validate the request body.
  // body: object({
  //   // email should be valid and non-empty
  //   accountHolderName: z.string().min(1).max(18),
  // }),
  body: object({
    name: string({
      required_error: "First name is required",
    }).min(3, "Name is too short - should be min 6 chars").max(18,"should be max 18 chars"),
  })
});


export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];


export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId:{type: String}
},
{
    timestamps: true,
});


export default mongoose.model('User', UserSchema);


