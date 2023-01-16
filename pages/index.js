import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
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
  return (
    <>
     choice
      {/* <button onClick={() => signIn()}>Sign in</button> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
