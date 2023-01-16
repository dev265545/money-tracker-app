import mongoose, { model, models, Schema } from "mongoose";

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  total_amount : {
    type : Number,
    required : true
  },
  createdby: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  paidby: {
    type: String,
  },
  members: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      amount : {
        type : String
      }
    },
  ],
});
const Groups = models?.Groups || model("Groups", UserSchema);
export default Groups;
