import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar';
import {BiPlusCircle} from "react-icons/bi"
import NewGroupModal from '../../../Components/NewGroupModal';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import Image from "next/image"
import AddFriendModal from '../../../Components/AddFriendModal';
import { GrGroup } from 'react-icons/gr';

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
          .get(`https://money-tracker-app.vercel.app/api/users?uid=${id}`)
          .then((resp) => {
            setuser(resp.data.data)
           setlist([])
           setgroups([])


          });
      }, [session?.user?.id]);
 useEffect(()=>{
                    


user?.friends.map((friend) => {
  axios
    .get(`https://money-tracker-app.vercel.app/api/users/addfriend?code=${friend.code}`)
    .then((resp) => {
       const data = resp.data.data;
       setlist((old) => [...old, data]);
    });
});
      },[user])

 useEffect(() => {
   user?.groups.map((group) => {
     axios
       .get(`https://money-tracker-app.vercel.app/api/group?group_id=${group.code}`)
       .then((resp) => {
         console.log(resp.data.data);
         const data = resp.data.data
          setgroups((old) => [...old,data]);
       });
   });

 }, [user]);


      
console.log("list",list)
console.log("usergroups",usergroups)
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
            <div className="py-8 w-full  flex flex-col gap-3">
              {usergroups.map((group, index) => (
                <div
                  key={index}
                  className="lg:flex items-center justify-center rounded-xl shadow-2xl shadow-black "
                >
                  <div className=" bg-white p-6 shadow rounded">
                    <div className="flex items-center border-b border-gray-200 pb-6">
                      <GrGroup className="text-3xl" />
                      <div className="flex items-start justify-between w-full">
                        <div className="pl-3 w-full">
                          <p className="text-xl font-medium leading-5 text-gray-800">
                            {group?.name}
                          </p>
                          <p className="text-sm leading-normal pt-2 text-gray-500">
                            {group?.members?.length}
                          </p>
                        </div>
                        <div className='flex font-semibold'>
                         Total Amount : {group.total_amount}
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
                      <div class="">
                        <table class="w-full text-sm text-left text-gray-500 ">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
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
                            {group.members.map((member, index) => (
                              <tr key={index} class="bg-white ">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  {member.membername}
                                </th>
                                <td class="px-6 py-4">{member.memberemail}</td>
                                <td class="px-6 py-4">{group.each_payee} </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex">
                      
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
      {addfriend && <AddFriendModal setAddFriend={setAddFriend} />}
    </div>
  );
}

export default Groups