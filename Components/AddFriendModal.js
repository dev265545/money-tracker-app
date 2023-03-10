import React, { useState } from 'react'
import axios from "axios";
import  Image  from "next/image";
import logo from "../public/image.svg"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AddFriendModal({setAddFriend}) {
    const router = useRouter();


    const { data: session } = useSession();

  
    const [code, setCode] = useState("");
    const addTodoHandler = async () => {
      let databody = {
        code: code,
      };
      axios
        .post(`/api/users/addfriend?code=${session?.user?.id}`, databody)
        .then(function (response) {
          console.log(response);
        });
      setCode("");
    };  
  return (
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
  );
}

export default AddFriendModal