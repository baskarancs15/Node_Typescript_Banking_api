import mongoose, { Schema } from 'mongoose';


const AccountSchema: Schema = new Schema({
  accountNo: { type: String, required: true },
  amount: { type: String, required: true },
  depositLimit:{type:Number,reuired:true},
  withdrawLimit:{type:Number,reuired:true}
},
{
    timestamps: true,
});


export default mongoose.model('AccoutInfo', AccountSchema);


