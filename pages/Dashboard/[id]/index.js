import axios from "axios";
import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GrAddCircle, GrMoney } from "react-icons/gr";
import Card from "../../../Components/Card";
import Modal from "../../../Components/Modal";
import Navbar from "../../../Components/Navbar";
import {BsChevronCompactDown} from "react-icons/bs"
import { BiPlusCircle } from "react-icons/bi";
import AddCategory from "../../../Components/AddCategroy";

function UserDashboard() {
    const router =  useRouter()
    const [showmore,setShowMore] = useState(false)

     const { id } = router.query;
     console.log(id)
      const { data: session } = useSession();

      const [user, setuser] = useState();
      const [transactions,settransactions] = useState([])
      const gettransaction = ()=>{
 axios
   .get(`https://money-tracker-app.vercel.app/api/users?uid=${session?.user?.id}`)
   .then((resp) => {
     setuser(resp.data.data);
     settransactions(user?.transactions);
     console.log("gettransaction")
   });
      }
      useEffect(() => {
       gettransaction()
      }, [session?.user?.id]);
      console.log(user)
    const[newtrans,setNewTrans] = useState(false)
     const [newcategory, setNewCateogry] = useState(false);
    const handleclick =()=>{
          setNewTrans(!newtrans)
    }
    const handleclickcategory = () => {
      setNewCateogry(!newcategory);
    };
  return (
    <div>
      <div class="min-h-screen bg-green-100 flex flex-row  ">
        <Navbar className="bg-white" />
        <div className="p-20 mt-20 pt-20">
          <div className="">
            <div className=" grid grid-cols-2  gap-10">
              <div className="p-4  w-[250px] h-[155px] wavy  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <button
                  className=" bg-white  rounded-full font-bold uppercase text-xs p-2  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                >
                  <BiPlusCircle
                    onClick={(e) => {
                      setNewTrans(true);
                    }}
                    className="text-4xl   rounded-full "
                  ></BiPlusCircle>
                </button>{" "}
                <div className="text-white font-bold text-4xl">
                  New Transaction
                </div>
              </div>
              <div className="p-4  w-[250px] h-[155px] wavy  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <button
                  className=" bg-white  rounded-full font-bold uppercase text-xs p-2  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                >
                  <BiPlusCircle
                    onClick={(e) => {
                      setNewCateogry(true);
                    }}
                    className="text-4xl   rounded-full "
                  ></BiPlusCircle>
                </button>{" "}
                <div className="text-white font-bold text-4xl">
                  Add Category
                </div>
              </div>
            </div>
            <div className="mt-4 font-semibold text-3xl text-gray-600">
              Transactions
            </div>
            <div className="w-full flex justify-center items-center flex-col">
              {user?.transactions?.map((transaction, index) => (
               transaction?.type ==="spend" ? (<div key={index} className="w-full">
                  <div class="flex justify-center p-2 w-full ">
                    <div class=" p-6 rounded-xl shadow-lg shadow-red-200 bg-red-200 w-full grid grid-cols-3 gap-4  ">
                      <GrMoney className="text-5xl bg-red-200 m-3 p-1 rounded-full  " />
                      <h5 class="text-gray-600 text-xl leading-tight font-medium mb-2">
                        {transaction?.name}
                        <p class="text-gray-700 text-base mb-4">
                          {moment(transaction?.Date).format("Do ddd MMM yyyy")}
                        </p>
                      </h5>
                      <div className="flex  justify-end text-xl font-semibold text-gray-600 ">
                        - Rs. {transaction?.amount}
                        <div className="flex pr-13  p-5 justify-end text-xl font-semibold text-gray-600 ">
                          <BsChevronCompactDown
                            key={index}
                            onClick={(e) => setShowMore(!showmore)}
                            className="text-5xl"
                          />
                        </div>
                      </div>
                      {showmore && <div>hello</div>}
                    </div>
                  </div>
                </div>)
              :(
                <div key={index} className="w-full">
                <div class="flex justify-center p-2 w-full ">
                    <div class=" p-6 rounded-xl shadow-lg shadow-green-200 bg-green-200 w-full grid grid-cols-3 gap-4  ">
                      <GrMoney className="text-5xl bg-green-200 m-3 p-1 rounded-full  " />
                      <h5 class="text-gray-600 text-xl leading-tight font-medium mb-2">
                        {transaction?.name}
                        <p class="text-gray-700 text-base mb-4">
                          {moment(transaction?.Date).format("Do ddd MMM yyyy")}
                        </p>
                      </h5>
                      <div className="flex  justify-end text-xl font-semibold text-gray-600 ">
                        - Rs. {transaction?.amount}
                        <div className="flex pr-13  p-5 justify-end text-xl font-semibold text-gray-600 ">
                          <BsChevronCompactDown
                            key={index}
                            onClick={(e) => setShowMore(!showmore)}
                            className="text-5xl"
                          />
                        </div>
                      </div>
                      {showmore && index === index && <div>hello</div>}
                    </div>
                  </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      {newtrans && <Modal handleclick={handleclick} id={id} gettransaction={gettransaction}/>}
      {newcategory && <AddCategory handleclick={handleclickcategory} id={id} />}
    </div>
  );
}

export default UserDashboard;
