import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  code : {
    type : String
  },
  photo_url: {
    type: String,
  },
  friends : [{
    code : {
      type : String
    }
  }],
  transactions: [
    {
      category: { type: String },
      amount:{ type:  Number},
      Date:{ type:  Date},
      name : {type : String},
      details: { type: String },
    },
  ],
});
const User =
  models?.Users_money || model("Users_money",UserSchema);
export default User;
