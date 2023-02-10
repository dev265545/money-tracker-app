import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Modal({handleclick,id,gettransaction}) {
const today = new Date()

const [user, setUser] = useState();
const[options,setOptions]=useState([])
useEffect(() => {
  
    axios
      .get(`http://localhost:3000/api/users?uid=${id}`)
      .then((resp) => {
        setUser(resp.data.data);
      
  //       setOptions([])
  //       user?.categories?.map((category)=>{
  //         console.log(category.name)
  // options.push(category.name)
  //       })
      });
  }
, [id]);
    const [name,setName] = useState("")
    const [details, setdetails] = useState("");
    const [amount,setAmount] = useState(0)
    const [date,setDate]  = useState(new Date())
    const [category,setCategory] = useState("")
    
    const [types, setTypes] = useState(["spend", "earned"]);
    const [type,setType] = useState("")
    const handlesubmit = (e)=>{
        e.preventDefault()
        const databody = {
         name : name,
         amount :  amount,
         Date  :  date,
         details :  details,
         category : category,
         type : type
        };
        if(type=="spend"){
          const changespend = parseInt(parseInt(user?.totalspend) + parseInt(amount))
          const changetotal = parseInt(parseInt(user?.totalmoney) - parseInt(amount))

           axios
             .post(
               ` http://localhost:3000/api/transactions/spend?uid=${id}`,
               {totalspend :changespend}
             )
             .then(function (response) {
               console.log(response);
             });
              axios
                .post(
                  ` http://localhost:3000/api/transactions/total?uid=${id}`,
                  { totalmoney: changetotal }
                )
                .then(function (response) {
                  console.log(response);
                });
        
        }
         if (type == "earned") {
          console.log(user?.totalmoney)
           const changespend = parseInt(parseInt(user?.totalearned) + parseInt(amount));
           const changetotal = parseInt(parseInt(user?.totalmoney) + parseInt(amount));

           axios
             .post(
               ` http://localhost:3000/api/transactions/earn?uid=${id}`,
               {totalearned :changespend}
             )
             .then(function (response) {
               console.log(response);
             });
           axios
             .post(
               ` http://localhost:3000/api/transactions/total?uid=${id}`,
              {totalmoney :changetotal}
             )
             .then(function (response) {
               console.log(response);
             });
         }
        axios
          .post(
            ` http://localhost:3000/api/transactions?uid=${id}`,
            databody
          )
          .then(function (response) {
            console.log(response);
            
           setTimeout(gettransaction(), 1000);
           
           setTimeout(gettransaction(), 1000);
          });
        
          handleclick()
    }
  return (
    <div>
      {/* <!-- Modal toggle --> */}
      {/* <div class="flex justify-center m-5">
    <button id="defaultModalButton" data-modal-toggle="defaultModal" class="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
    Create product
    </button>
</div> */}
      {/* 
<!-- Main modal --> */}
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div class="relative p-4 bg-teal-100 rounded-lg shadow  sm:p-5">
            {/* <!-- Modal header --> */}
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900">
                Add Transaction
              </h3>
              <button
                onClick={handleclick}
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
            {/* <!-- Modal body --> */}
            <form action="#">
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    type="text"
                    name="name"
                    id="name"
                    class="bg-teal-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="brand"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    name="brand"
                    id="brand"
                    class="bg-teal-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product brand"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Amount Spend
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    value={amount}
                    type="number"
                    name="price"
                    id="price"
                    class="bg-teal-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    id="category"
                    class="bg-teal-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Please choose one option</option>
                    {user?.categories.map((option, index) => {
                      return <option key={index}>{option.name}</option>;
                    })}
                  </select>
                </div>

                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    id="category"
                    class="bg-teal-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Please choose one option</option>
                    {types.map((option, index) => {
                      return <option key={index}>{option}</option>;
                    })}
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      setdetails(e.target.value);
                    }}
                    value={details}
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-teal-100 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <button
                onClick={(e) => handlesubmit(e)}
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                Add new Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal