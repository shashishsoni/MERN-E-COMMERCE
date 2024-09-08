import React, { useState } from 'react';
import { T_SignUpBody } from '../../@types/Types';
import { PostSignUp } from '../../services/http.service';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/Navigation/NavBar";
import image from '../../assets/welcome.png';

function SignUp() {
  const navigate = useNavigate();

  // State for form inputs and errors
  const [userInput, setUserInput] = useState<T_SignUpBody>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');

  // Handle form input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await PostSignUp(userInput);

      // If registration is successful, redirect to the SignIn page
      if (response.status === 201) {
        navigate('/SignIn');
      }
    } catch (error: any) {
      setInputError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-gray-100 border-navajowhite bg-navajowhite">
     <NavBar/>
      <div className="w-1/2 h-full flex items-center justify-center" style={{ backgroundColor: 'rgb(250 159 21)' }}>
      </div>

      <div className="w-1/2 h-full flex items-center justify-center bg-navajowhite">
      </div>

      <div className="absolute flex h-full w-full max-h-[55rem] max-w-[90rem] items-center justify-center rounded-lg shadow-lg mx-10 border-[3px] border-white">
        <div className="w-1/2 h-full flex items-center justify-center" style={{ backgroundColor: 'rgb(250 159 21)' }}>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center bg-navajowhite">
        </div>

        <div className="absolute flex w-[1160px] h-[80%] border-r-4 shadow-lg border-[3px] border-white">
          <div className="w-1/2 h-full flex items-center justify-center">
          </div>

          <div className="w-1/2 h-full flex items-center justify-center">
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-[60%] h-[50%] flex overflow-hidden rounded-lg shadow-lg z-10 border-[3px] border-white">

            {/* Left Side: Welcome Section */}
            <div className="flex w-1/2 flex-col items-center justify-center p-10">
              <h1 className="mt-12 mb-4 text-3xl font-bold text-yellow-950 font-nerko">Join Us Now</h1>
              <p className="text-center font-nerko text-yellow-950">
                Create your account and start shopping for exclusive anime merchandise!
              </p>
              <img src={image} alt="Welcome" className="mt-6 w-4/5" />
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex flex-col w-1/2 p-8 bg-navajowhite">
              <h1 className="mt-12 mb-6 text-2xl font-bold font-playwrite text-yellow-950">Sign Up</h1>

              <input
                placeholder="Username"
                type="text"
                className="mb-4 w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={handleInput}
                value={userInput.username}
                name="username"
              />

              <input
                placeholder="Email ID"
                type="email"
                className="mb-4 w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={handleInput}
                value={userInput.email}
                name="email"
              />

              <input
                placeholder="Password"
                type="password"
                className="mb-4 w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={handleInput}
                value={userInput.password}
                name="password"
              />

              <button
                className={`w-full rounded-md p-3 text-white font-bold transition duration-200 hover:bg-yellow-500 focus:outline-none ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                style={{ backgroundColor: 'rgb(250 159 21)' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Sign Up'}
              </button>

              {inputError && <p className="mt-4 text-sm font-bold text-red-600">{inputError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
