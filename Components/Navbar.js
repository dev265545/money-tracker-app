import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React from 'react'


function Navbar() {
  const router = useRouter()
  const { data : session} = useSession()

  return (
    <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r md:w-56 hover:w-56 bg-black hover:bg-black hover:shadow-lg">
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class=" text-2xl text-white w-max p-2.5 flex flex-row gap-3 p-2">
            <div className='bg-blue-600 logo rounded-full w-10 h-10 p-1'></div>
            Money Tracker
          </div>
          <ul class="mt-6 space-y-2 tracking-wide">
            <li class="min-w-max">
              <a
                href="#"
                aria-label="dashboard"
                class="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
              >
                <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                    class="fill-current text-cyan-400 dark:fill-slate-600"
                  ></path>
                  <path
                    d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                    class="fill-current text-cyan-200 group-hover:text-cyan-300"
                  ></path>
                  <path
                    d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                    class="fill-current group-hover:text-sky-300"
                  ></path>
                </svg>
                <span
                  onClick={() => {
                    router.push(`/Dashboard/${session?.user?.id}`);
                  }}
                  class="-mr-1 font-medium"
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li class="min-w-max">
              <a
                href="#"
                class="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    class="fill-current text-gray-300 group-hover:text-cyan-300"
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clip-rule="evenodd"
                  />
                  <path
                    class="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span
                  onClick={() =>
                    router.push(`/Dashboard/${session?.user?.id}/Groups`)
                  }
                  class="group-hover:text-gray-700"
                >
                  New Group
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="w-max -mb-3">
          <a
            href="#"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 group-hover:fill-cyan-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <div
              onClick={() => signOut({ callbackUrl: "/login" })}
              className=""
            >
              <span class="group-hover:text-gray-700">Logout</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar