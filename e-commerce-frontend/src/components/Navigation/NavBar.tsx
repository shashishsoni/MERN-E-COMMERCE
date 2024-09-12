import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import logo from '../../assets/kanjiLogo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchInventory } from '../../services/http.service';
import { T_Product } from '../../@types/Types';
import image from '../../assets/shopping-cart.png';
import image2 from '../../assets/account.png';

function NavBar() { 
  const navigate = useNavigate();
  const { isloggedin, logout, Cart } = useAppContext();
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setsearchReasult] = useState<T_Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For the account dropdown
  const SearchdropDownRef = useRef<HTMLDivElement>(null);
  const AccountdropDownRef = useRef<HTMLDivElement>(null);

  const Search = async (keyword: string) => {
    if (!keyword) return setsearchReasult([]);
    const response = await SearchInventory(keyword);
    setsearchReasult(response?.data?.data);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (SearchdropDownRef.current && !SearchdropDownRef.current.contains(event.target as Node)) &&
      (AccountdropDownRef.current && !AccountdropDownRef.current.contains(event.target as Node))
    ) {
      setsearchReasult([]);
      setKeyword('');
      setIsDropdownOpen(false); 
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="headers sticky top-0">
      <nav className="flex items-center justify-between border px-5 py-3 shadow-lg rounded-xl bg-[#b39ddb]">
        <div className="item-center flex gap-x-8">
          <img className="size-8 w-24" src={logo} alt="" />
          <div className="relative" ref={SearchdropDownRef}>
            <input
              type="text"
              placeholder="Search"
              className="mt-1 w-[300px] border-collapse rounded-md border-gray-700 bg-gray-200 px-2 py-2 outline-none"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            />
            {searchResult?.length > 0 && (
              <div className="absolute mt-2 max-h-[500px] w-full overflow-y-auto bg-slate-50 p-5 shadow-md Search_Result">
                {searchResult.map((res) => (
                  <div
                    key={res._id}
                    className="flex items-start gap-x-2 pb-5 pt-5 pl-3 hover:bg-slate-400 rounded-lg"
                  >
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
            to="/Explore"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'border-b-2 border-[#141414] font-protest' : ''} mt-1 pb-1 text-[20px] font-serif`
            }
          >
            Explore
          </NavLink>
        </div>

        <div className="flex items-center font-serif text-[20px] relative" ref={AccountdropDownRef}>
          <img src={image} alt="" className="h-5 mt-1 mr-2" />
          <button>
            <NavLink 
              to = "/CartPage"
            >
            Cart ({Cart.length})
            </NavLink>
          </button>
          <img src={image2} alt="" className="h-6 mt-1 ml-5 mr-1" />
          <button onClick={toggleDropdown}>
            My Account
          </button>

          {isDropdownOpen && (
            <div className="absolute right-[-9px] top-full mt-2 w-36 bg-[#ab96d1] text-black rounded-lg shadow-lg">
              {isloggedin ? (
                <>
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </NavLink>
                  <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-200">
                    Orders
                  </NavLink>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/SignIn" className="block px-4 py-2 hover:bg-gray-200">
                    Sign In
                  </NavLink>
                  <NavLink to="/SignUp" className="block px-4 py-2 hover:bg-gray-200">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
