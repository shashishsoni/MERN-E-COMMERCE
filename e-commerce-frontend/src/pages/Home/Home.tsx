import React from 'react';
import { useAppContext } from '../../context/AppContext';
import logo from '../../assets/kanjiLogo.svg';
import { NavLink } from 'react-router-dom';
function Home() {
     const {logout} = useAppContext();

  return (
    <div>
      <nav className="flex items-center justify-between border px-5 py-3 shadow-md">
        <div className='flex item-center gap-x-8'>
          <img className="size-8 w-24" src={logo} alt="" />
          <input 
               type="text"
               placeholder='Search'
               className='w-[300px] mt-1 border-collapse border-gray-700 px-2 py-2 rounded-md bg-gray-200 outline-none'
          />
        </div>
        <div className='flex gap-x-3'>
          <NavLink 
               to={"/"}
               className={({isActive})=>
                    isActive ? 'bg-green-500 font bold' : 'bg-zinc-800'
               }>Home
          </NavLink>
          <NavLink to={"/WishList"}>WishList</NavLink>
          <NavLink to={"/cart"}>Cart</NavLink>
          <NavLink to={"/account"}>Account</NavLink>
        </div>
        <button className="rounded-md bg-black px-4 py-2 text-[14px] text-white"
        onClick={logout}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
}

export default Home;
