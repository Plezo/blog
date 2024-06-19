"use client";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Home() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <div className="flex justify-center bg-blog-light-black w-96 h-auto rounded-2xl">
      <div className="flex  flex-col items-center my-2">
        <div className="flex items-start w-full">
          <h1 className="text-xl font-bold pt-10 text-blog-grey">
            Join BlogWiz.
          </h1>
        </div>
        <div className="flex flex-col pb-10 pt-4 gap-4">
          <div className="flex flex-col  gap-2">
            <label className="text-blog-grey font-semibold">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="bg-blog-light-black text-blog-grey px-4 py-2 h-12 w-30 rounded-lg
               border-blog-grey border"
            />
            <label className="text-blog-grey font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-blog-light-black text-blog-grey px-4 py-2 h-12 w-30 rounded-lg
               border-blog-grey border"
            />
          </div>
          <button
            className="flex flex-row gap-4 bg-blog-teal text-blog-grey px-4 py-4 h-12  w-30
          rounded-3xl  hover:bg-blog-dark-teal transition-all 
          ease-in-out duration-300"
          >
            <MdOutlineEmail className="h-5 w-5" />
            Sign up with email
          </button>
          <button
            className="flex flex-row gap-4  bg-blog-teal text-blog-grey px-4 py-4 h-12 w-30  
          rounded-3xl  hover:bg-blog-dark-teal transition-all 
          ease-in-out duration-300"
            onClick={handleLogin}
          >
            <FaGoogle className="h-5 w-5" />
            Sign in with Google
          </button>
          <div className="flex gap-1">
            <p className="text-blog-grey ">Already have an account? </p>
            <a href="/login" className="text-blog-teal hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
