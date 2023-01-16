import axios from "axios";
import React, { useEffect, useState } from "react";

function NewGroupModal({ handleclick, id }) {
  const today = new Date();
  const [name, setName] = useState("");
  const [details, setdetails] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [options, setoptions] = useState(["one", "two", "three"]);
  const handlesubmit = (e) => {
    e.preventDefault();
    const databody = {
      name: name,
      createdby : creator,
      group_members : [{

      }],
      amount: amount,
      paidby : payee,
      Date: date,
      details: details,
      category: category,
    };
    axios
      .post(` http://localhost:3000/api/transactions?uid=${id}`, databody)
      .then(function (response) {
        console.log(response);
      });

    handleclick();
  };
  console.log(date);
  let x = []
  const[click,SetClick] = useState(1)
  const [number,setnumber]= useState(0)
  const[membername,setmembername]=useState("")
  const [memberemail, setmemberemail] = useState("");
    const [memberamount, setmemberamount] = useState(amount/number);
    useEffect(()=>{
        setmemberamount(amount/number)
    },[number,amount])
    const[list,setlist]=useState([])
  const newmemberclick = ()=>{
    setnumber(number +1);
    console.log(number)
    const body = {
        membername : membername,
        memberemail : memberemail,
      
    }
    console.log(membername)
    list.push(body)
    console.log(body)
    console.log(x)


    setmembername("")
    setmemberemail("");
    setmemberamount(amount/number)
  }
  console.log(memberamount)
  console.log("list",list)
  return (
    <>
      <div
        id="extralarge-modal"
        tabindex="-1"
        class="fixed  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div class="relative w-full h-full max-w-7xl md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                New Group Bill Split
              </h3>
              <button
                onClick={() => {
                  handleclick();
                }}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <div className="   flex items-center justify-center">
                <div className=" ">
                  <div>
                    <div className="   ">
                      <div className="">
                        <div className="text-white gap-20 grid  grid-cols-2 flex-end lg:grid-cols-1 ">
                          <div
                            onClick={() => SetClick(1)}
                            className="text-white"
                          >
                            <p className="font-medium text-lg">
                              Group General Details
                            </p>

                            <p>Please fill all the details</p>
                          </div>
                          <div
                            onClick={() => SetClick(2)}
                            className="Add Memebers"
                          >
                            <p className="font-medium text-lg">Add Members</p>
                            <p>List out all the members in this bill</p>
                          </div>
                          {/* <div
                            onClick={() => SetClick(3)}
                            className="text-gray-600"
                          >
                            <p className="font-medium text-lg">
                              Specific Details
                            </p>
                            <p>Please fill out all the fields.</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form action="#">
              {click == 1 && (
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Group Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Created By
                    </label>

                    <input
                      onChange={(e) => {
                        setcreator(e.target.value);
                      }}
                      value={creator}
                      type="text"
                      name="creator"
                      id="creator"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Created By"
                      required=""
                    />
                    <input
                      onChange={(e) => {
                        setcreatoremail(e.target.value);
                      }}
                      value={creatoremail}
                      type="text"
                      name="creatoremail"
                      id="creatoremail"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Email id of Creator"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="amount"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount
                    </label>
                    <input
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      type="number"
                      name="Amount"
                      id="Amount"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required=""
                      value={amount}
                    />
                  </div>
                  <div>
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                    </select>
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={(e) => {
                        setdetails(e.target.value);
                      }}
                      id="description"
                      rows="4"
                      value={details}
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                  <div className="flex flex-row gap-3">
                    <label
                      for="payee"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Paid By
                    </label>

                    <input
                      onChange={(e) => {
                        setpayee(e.target.value);
                      }}
                      value={Payee}
                      type="text"
                      name="Payee"
                      id="Payee"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Paid By"
                      required=""
                    />
                    <input
                      onChange={(e) => {
                        setpayeeemail(e.target.value);
                      }}
                      value={payeeemail}
                      type="text"
                      name="payeeemail"
                      id="payeeemail"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Email id of Payee"
                      required=""
                    />
                  </div>
                </div>
              )}
              {click == 2 && (
                <div>
                  <hr></hr>
                  <div className="text-white flex justify-center items-center">
                    Members{" "}
                  </div>
                  <div className="flex flex-row gap-3">
                    <label
                      for="payee"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Member Name
                    </label>

                    <input
                      type="text"
                      name="Payee"
                      id="Payee"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Member Name"
                      required=""
                      onChange={(e) => {
                        setmembername(e.target.value);
                      }}
                      value={membername}
                    />
                    <label
                      for="payee"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email ID
                    </label>
                    <input
                      type="text"
                      name="payeeemail"
                      id="payeeemail"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Email id of Member"
                      required=""
                      onChange={(e) => {
                        setmemberemail(e.target.value);
                      }}
                      value={memberemail}
                    />
                  </div>
                  <div>
                    <label
                      for="amount"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount
                    </label>
                    <input
                      disabled
                      onChange={(e) => {
                        setmemberamount(e.target.value);
                      }}
                      type="number"
                      name="Amount"
                      id="Amount"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rs 1400"
                      required=""
                      value={amount / (number + 1)}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      newmemberclick();
                    }}
                    type="button"
                    class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      class="mr-1 -ml-1 w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Add new Member
                  </button>
                  <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3 rounded-l-lg">
                            Member name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Email Id
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Amount Pay (Shared)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((member, index) => (
                          <tr key={index} class="bg-white dark:bg-gray-800">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {member.membername}
                            </th>
                            <td class="px-6 py-4">{member.memberemail}</td>
                            <td class="px-6 py-4">{memberamount} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewGroupModal;
