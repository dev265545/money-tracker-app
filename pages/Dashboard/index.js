import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState();
  useEffect(() => {
    if (session?.user?.id != undefined) {
      axios
        .get(`https://money-tracker-app.vercel.app/api/users?uid=${session?.user?.id}`)
        .then((resp) => {
          setUser(resp.data);
        });
    }
  }, [session?.user?.id]);

  if (user?.data === null) {
    router.push("/Newuser");
  }
  useEffect(() => {
    if (user?.data?.uid !== undefined) {
      router.push(`/Dashboard/${user?.data?.uid}`);
    }
  }, [router, user?.data?.uid]);



  return (
    <div className="text-3xl flex items-center text-center justify-center">
    hello
    </div>
  );
}


export default Dashboard;
export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
