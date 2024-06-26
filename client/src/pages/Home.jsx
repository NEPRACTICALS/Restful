import { Link } from "react-router-dom";

// component of Home 

export default function Home() {
  return (
    <div className="w-full flex-col min-h-screen flex items-center justify-center gap-y-3 ">
      <h1 className="text-2xl font-semibold text-gray-800">
        WELCOME  TO RWANDA CODING ACADEMY LIBRARY MANAGEMENT SYSTEM   
      </h1>
      <p className="text-2xl">login or signup to continue</p>
      <div className="flex gap-x-4">
        <Link to={"/login"}>
          <button className="bg-blue-700 min-w-40 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            login
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            create account
          </button>
        </Link>
      </div>
    </div>
  );
}
