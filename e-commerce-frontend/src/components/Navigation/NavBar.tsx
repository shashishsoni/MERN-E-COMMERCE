import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import logo from '../../assets/kanjiLogo.svg';
import { NavLink } from 'react-router-dom';
import { SearchInventory } from '../../services/http.service';
import { T_Product } from '../../@types/Types';

function NavBar() {
  const { logout } = useAppContext();
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setsearchReasult] = useState<T_Product[]>([]);
  const SearchdropDownRef: React.LegacyRef<HTMLDivElement> | undefined =
    useRef(null);

  const Search = async (keyword: string) => {
    if (!keyword) return setsearchReasult([]);
    // code for search functionality
    const response = await SearchInventory(keyword);
    setsearchReasult(response?.data?.data);
    console.log(response?.data?.data);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      SearchdropDownRef.current &&
      !SearchdropDownRef.current.contains(event.target as Node)
    ) {
      setsearchReasult([]);
      setKeyword('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      Search(keyword);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [keyword]);

  return (
    <div>
      <nav className="flex items-center justify-between border px-5 py-3 shadow-md">
        <div className="item-center flex gap-x-8">
          <img className="size-8 w-24" src={logo} alt="" />
          <div className="relative" ref={SearchdropDownRef}>
            <input
              type="text"
              placeholder="Search"
              className="mt-1 w-[300px] border-collapse rounded-md border-gray-700 bg-gray-200 px-2 py-2 outline-none"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setKeyword(e.target.value);
              }}
            />
            {/* condition oprator */}
            {searchResult?.length > 0 && (
              <div className="absolute mt-2 max-h-[500px] w-full overflow-y-auto bg-slate-50 p-5 shadow-md Search_Result">
                {searchResult.map((res) => (
                  <div key={res._id} className="flex items-start gap-x-2 pb-5 pt-5 pl-3 hover:bg-slate-400 rounded-lg">
                    <img className="mr-5 aspect-square w-16" src={res.image} />
                    <h2 className="text-[14px] text-center justify-center mt-6">{res.name}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-x-6">
          <NavLink
            to="/Home"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'border-b-2 border-[#141414] font-protest' : ''} pb-1 mt-1 text-[20px] font-serif`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/WishList"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'border-b-2 border-[#141414] font-protest' : ''} pb-1 mt-1 text-[20px] font-serif`
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'border-b-2 border-[#141414] font-protest' : ''} mt-1 pb-1 text-[20px] font-serif`
            }
          >
            Explore
          </NavLink>
        </div>
        <div className='flex item-center '>

        </div>
        {/* <button
          className="rounded-md bg-black px-4 py-2 text-[14px] text-white"
          onClick={logout}
        >
          Sign Out
        </button> */}
      </nav>
    </div>
  );
}

export default NavBar;
