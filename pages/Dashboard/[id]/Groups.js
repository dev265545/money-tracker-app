import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar';
import {BiPlusCircle} from "react-icons/bi"
import NewGroupModal from '../../../Components/NewGroupModal';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import{ Image }from "next/image"
import logo from "../../../public/image.svg"

function Groups() {
  const router =  useRouter()
const [list,setlist] = useState([])
    const [showmore,setShowMore] = useState(false)

     const { id } = router.query;

      const { data: session } = useSession();

      const [user, setuser] = useState();
      const[usergroups,setgroups] = useState([])
      
      const [addfriend,setAddFriend] = useState(false)
      useEffect(() => {
        axios
          .get(`http://localhost:3000/api/users?uid=${id}`)
          .then((resp) => {
            setuser(resp.data.data)
           setlist([])
           setgroups([])


          });
      }, [session?.user?.id]);
 useEffect(()=>{
                    


user?.friends.map((friend) => {
  axios
    .get(`http://localhost:3000/api/users/addfriend?code=${friend.code}`)
    .then((resp) => {
      list.push(resp.data.data)
      console.log(resp.data.data)
    });
});
      },[user])

 useEffect(() => {
   user?.groups.map((group) => {
     axios
       .get(`http://localhost:3000/api/group?code=${group.code}`)
       .then((resp) => {
         usergroups.push(resp.data.data);
         console.log(resp.data.data);
       });
   });
 }, [user]);


      
console.log(list)
    const[newtrans,setNewTrans] = useState(false)
    const handleclick =()=>{
          setNewTrans(!newtrans)}


   const [code,setCode] = useState("")    
  const addTodoHandler = async () => {


    let databody = {
     
      code: code,

      
    };
    axios.post(`/api/users/addfriend?code=${session?.user?.id}`, databody).then(function (response) {
      console.log(response);
    });
   setCode("")
  };  
console.log(user?.groups)
  return (
    <div>
      <div class="min-h-screen bg-green-100 flex flex-row  ">
        <Navbar className="bg-white" />
        <div className=" top-200 absolute h-full right-0  bg-slate-800   rounded-l-xl ">
          <div className=" flex justify-center items-center p-6 text-white font-semibold text-3xl">
            Friends
          </div>
          <div class="relative overflow-x-auto p-10  mt-10 pt-11  flex   items-start justify-start ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((friend, index) => (
                  <tr key={index} class="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {friend?.code}
                    </th>
                    <td class="px-6 py-4">{friend?.name}</td>

                    <td class="px-6 py-4">{friend?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-20 mt-20 pt-20 grid grid-rows-2 gap-20">
          <div className="grid grid-cols-2 gap-10">
            <div className="p-4  w-[250px] h-[155px] iso-pattern  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
              <div className="text-white font-bold shaodow-4xl shadow-orange-500 text-4xl">
                New Group
              </div>
            </div>
            <div className="p-4  w-[250px] h-[155px] wavy  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <button
                className=" bg-white  rounded-full font-bold uppercase text-xs p-2  shadow-lg hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
              >
                <BiPlusCircle
                  onClick={(e) => {
                    setAddFriend(true);
                  }}
                  className="text-4xl   rounded-full "
                ></BiPlusCircle>
              </button>{" "}
              <div className="text-white font-bold text-4xl">Add Friend</div>
            </div>
            <div className="py-8 w-full grid grid-rows-3">
              {usergroups.map((group,index) => (
                <div key={index} className="lg:flex items-center justify-center w-1/2">
                  <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                    <div className="flex items-center border-b border-gray-200 pb-6">
                      {/* <img
                        src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png"
                        alt
                        className="w-12 h-12 rounded-full"
                      /> */}
                      <div className="flex items-start justify-between w-full">
                        <div className="pl-3 w-full">
                          <p className="text-xl font-medium leading-5 text-gray-800">
                            {group?.name}
                          </p>
                          <p className="text-sm leading-normal pt-2 text-gray-500">
                            {group?.members?.length}
                          </p>
                        </div>
                        <svg
                          width={28}
                          height={28}
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                            stroke="#2C3E50"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="px-2">
                      <p className="text-sm leading-5 py-4 text-gray-600">
                        A group of people interested in dogecoin, the currency
                        and a bit of side for the meme and dof that we all know
                        and love. These cases are perfectly simple and easy to
                        distinguish.
                      </p>
                      <div className="flex">
                        <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                          #dogecoin
                        </div>
                        <div className="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                          #crypto
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {newtrans && (
        <div className="flex items-center justify-center">
          <NewGroupModal handleclick={handleclick} id={id} />
        </div>
      )}
      {addfriend && (
        <div className="flex items-center justify-center">
          <div
            class="modal fade fixed top-0 left-1/3   w-1/2 h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog relative w-auto pointer-events-none">
              <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-gray-800 bg-clip-padding rounded-md outline-none text-white">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-800 rounded-t-md">
                  <h5
                    class="text-xl font-medium leading-normal text-white"
                    id="exampleModalLabel"
                  >
                    Add A Friend
                  </h5>

                  <button
                    onClick={() => setAddFriend(false)}
                    type="button"
                    class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body relative p-4">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      height={400}
                      width={400}
                      alt="gello"
                      className="flex items-center justify-center"
                      src={logo}
                    />
                    <div class="mb-6 flex flex-row ">
                      <label
                        for="large-input"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Friend Code
                      </label>
                      <input
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        type="text"
                        id="large-input"
                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => setAddFriend(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      addTodoHandler();
                    }}
                    type="button"
                    class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Groups