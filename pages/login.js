import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import axios from "axios";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();

const [user, setUser] = useState();
useEffect(() => {
  axios
    .get(`http://localhost:3000/api/users?uid=${session?.user?.id}`)
    .then((resp) => {
      setUser(resp.data.data);
    });

 
}, [session?.user?.id]);

if (user != null) {
  router.push(`/Dashboard/${session?.user?.id}`);
} 
// if (session) {
//   return (
//     <>
//       <CircleLoaderComponent />
//     </>
//   );
// }
  return (
    <div className="flex items-center justify-center mt-32">
      <button
        className=" border  border-solid border-purple-100 bg-purple-200 opacity-70 00 rounded-full   w-64 h-64 "
        onClick={() => signIn("google", { callbackUrl: "/Dashboard" })}
      >
        <p className="font-extrabold text-4xl opacity-100 ">Login</p>
      </button>
    </div>
  );
}

export default Login;
