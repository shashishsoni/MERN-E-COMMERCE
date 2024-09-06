import React, { useState } from 'react';
import { T_SignInBody } from '../../@types/Types';
import { postLogin } from '../../services/http.service';
import { useAppContext } from '../../context/AppContext';
import  {useNavigate} from 'react-router-dom';
import image from '../../assets/welcome.png'
function SignIn() {
  const navigate = useNavigate();
  const {setAccessToken, setLoggedIn, setUserData} = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<T_SignInBody>({
    email: '',
    password: '',
  });

  const [inputError, setInputError] = useState<string>('');

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    setUserInput((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async () => {

    try {

      setLoading(true);
      const response = await postLogin(userInput);
      console.log(response);
      if(response.status === 200) {
        setAccessToken(response?.data?.access_token);
        localStorage.setItem('accessToken', response?.data?.access_token);
        setUserData(response?.data?.user);
        localStorage.setItem('userData', JSON.stringify(response?.data?.user));
        setLoggedIn(true)
        localStorage.setItem('isLoggedIn', JSON.stringify(true));

        navigate('/Home');
      }
    } catch (e: any) {
      console.log('SignIn Error', e);
      if(e?.status === 400) {
          setInputError(e?.response?.data?.message)
      }
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-gray-100 border-navajowhite bg-navajowhite">

      {/* Left Side: Yellow Background (Half Width) */}
      <div className="w-1/2 h-full flex items-center justify-center" style={{backgroundColor: 'rgb(250 159 21)' }} >
      </div>

      {/* Right Side: No Background (Half Width) */}
      <div className="w-1/2 h-full flex items-center justify-center" style={{ backgroundColor: 'navajowhite'}}>
        {/* This area remains empty */}
      </div>

      {/* Outer Container (with max height and border) */}
      <div className="absolute flex h-full w-full max-h-[55rem] max-w-[90rem] items-center justify-center rounded-lg shadow-lg mx-10 border-[3px] border-white">

        {/* Left Side: Yellow Background (Half Width) */}
        <div className="w-1/2 h-full flex items-center justify-center" style={{backgroundColor: 'rgb(250 159 21)' }}>
        </div>

        {/* Right Side: No Background (Half Width) */}
        <div className="w-1/2 h-full  flex items-center justify-center bg-navajowhite">
          {/* This area remains empty */}
        </div>

        {/* New Div between outer and middle container */}
        <div className="absolute flex w-[1160px] h-[80%] border-r-4 shadow-lg border-[3px] border-white">
          
          {/* Left Side: Yellow Background (Half Width) */}
          <div className="w-1/2 h-full  flex items-center justify-center">
          </div>

          {/* Right Side: No Background (Half Width) */}
          <div className="w-1/2 h-full  flex items-center justify-center">
            {/* This area remains empty */}
          </div>
        </div>

        {/* Middle Container (Overlapping Both Sides) */}
        <div className="absolute inset-0 flex justify-center items-center ">
          <div className="relative w-[60%] h-[50%] flex overflow-hidden rounded-lg shadow-lg z-10 border-[3px] border-white">

            {/* Left Side: Welcome Back Section */}
            <div className="flex w-1/2 flex-col items-center justify-center  p-10">
              <h1 className="mt-12 mb-4 text-3xl font-bold text-yellow-950 font-nerko">Welcome back</h1>
              <p className="text-center font-nerko text-yellow-950">
              Welcome to the ultimate anime merchandise hub! Manage your shop effortlessly with KanjiAnime and turn your passion into success!
              </p>
              <img
                src={image}
                alt="KanjiAnimeWelcome"
                className="mt-6 w-4/5"
              />
            </div>

            {/* Right Side: Login Form */}
            <div className="flex flex-col w-1/2 p-8 bg-navajowhite" >
              <h1 className="mt-12 mb-6 text-2xl font-bold font-playwrite text-yellow-950" >Sign In</h1>

              <input
                placeholder="Email ID"
                type="email"
                className="mb-4 w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={HandleInput}
                value={userInput.email}
                name="email"
              />

              <input
                placeholder="Password"
                type="password"
                className="mb-4 w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={HandleInput}
                value={userInput.password}
                name="password"
              />

              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-yellow-950 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                className={`w-full rounded-md  p-3 text-white font-bold transition duration-200 hover:bg-yellow-500 focus:outline-none ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{backgroundColor: 'rgb(250 159 21)' }}
                onClick={HandleSubmit}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              {inputError && <p className="mt-4 text-sm font-bold text-red-600">{inputError}</p>}
            </div>
          </div>
        </div> {/* End of Middle Container */}
      </div> {/* End of Outer Container */}
    </div>


  )
} 

export default SignIn;
