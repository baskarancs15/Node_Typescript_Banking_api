import mongoose, { Schema } from 'mongoose';


const UserSchema: Schema = new Schema({
  email: {type: String,required: true,unique: true,trim: true,index: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: {type: String, required: true},
},
{
    timestamps: true,
});


export default mongoose.model('User', UserSchema);


