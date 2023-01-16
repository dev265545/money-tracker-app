import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuid} from "uuid"

import axios from "axios";
import { Router, useRouter } from "next/router";
function NewUserRegistration() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name);


  const [code, setCode] = useState("");
   

  const addTodoHandler = async () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(4, 8);

    let databody = {
      uid: session?.user?.id,
      name: name,
      email: session?.user?.email,
     totalspend : 0,
     totalmoney : 0,
     totalearned : 0,
    code: small_id,
     
      photo_url: session?.user?.image,
      
    };
    axios.post("/api/users", databody).then(function (response) {
      console.log(response);
    });
    router.push(`/Dashboard/${session?.user?.id}`);
  };

  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-900 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white   backdrop-blur-3xl rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 grid  grid-cols-3 lg:grid-cols-1 ">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                 
                </div>
            
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlhtmlFor="full_name">Full Name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="full_name"
                          id="full_name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={name}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={session?.user?.email}
                          placeholder="email@domain.com"
                        />
                      </div>

                    

                      {/* <div className="md:col-span-3">
                        <label htmlFor="pnum">Phone No.</label>
                        <div className="h-10 w-30 bg-gray-50 flex border border-gray-200   items-center mt-1">
                          <input
                            onChange={(e) => setPhoneNo(e.target.value)}
                            type="tel"
                            name="pnum"
                            id="pnum"
                            placeholder=""
                            className="px-2 text-center appearance-none outline-none  rounded text-gray-800 w-1/3 bg-transparent"
                            value={phone_no}
                          />
                        </div>
                      </div>
                     */}
                    </div>
                  </div>
       
              

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            onClick={() => addTodoHandler()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                  
        
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserRegistration;
