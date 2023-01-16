import mongoose, { model, models, Schema } from "mongoose";

const GroupSchema = new Schema({
  name: {
    type: String,

  },
  each_payee : {
    type : String
  },
  group_id: {
    type: String,

  },
  total_amount: {
    type: Number,
    
  },
  createdby: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  category : {type : String},
 
  paidby: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  members: [
    {
      membername: {
        type: String,
      },
      memberemail: {
        type: String,
      },
    
    },
  ],
});
const Groups = models?.Groups || model("Groups", GroupSchema);
export default Groups;
