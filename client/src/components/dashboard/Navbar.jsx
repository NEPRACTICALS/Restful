import { FaRegBell } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useRecoilState } from "recoil";
import { searchState } from "../../store";

const NavBar = () => {
  const { logout } = useAuth();
  const [, setKeyword] = useRecoilState(searchState);

  return (
    <div
      style={{ gridColumn: "2/3", gridRow: "-3/-2" }}
      className="border border-slate-100 flex items-center justify-between"
    >
      <div className=" ml-8">
        <div className="max-w-md mx-auto ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-[500px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-800  border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-600 "
              placeholder="Search Books, More..."
              onChange={(e) => setKeyword(e.target.value)}
              required
            /> 
          </div>
        </div>
      </div>

      <div className="flex items-center mr-8">
        <FaRegBell />
        <div className="relative w-10 h-10 m-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <button onClick={logout}>
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};
export default NavBar;
