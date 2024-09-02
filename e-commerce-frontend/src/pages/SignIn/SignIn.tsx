import React, { useState } from 'react';
import { T_SignInBody } from '../../@types/Types';
import { postLogin } from '../../services/http.service';

function SignIn() {
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
      const response = await postLogin(userInput);
      console.log(response);
    } catch (e) {
      console.log('SignIn Error', e);
      if(e?.status === 400) {
          setInputError(e?.response?.data?.message)
      }
    } finally {
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-800 text-center">
      <div className="flex min-w-[450px] flex-col gap-y-4 rounded-md bg-slate-400 p-8 shadow-md">
        <h1 className="text-[24px] font-medium">Sign In</h1>
        <input
          placeholder="Enter Email"
          type="text"
          className="rounded-md border-[2px] border-black p-2 outline-none"
          onChange={HandleInput}
          value={userInput.email}
          name="email"
        />
        <input
          placeholder="Enter password"
          type="password"
          className="rounded-md border-[2px] border-black p-2 outline-none"
          onChange={HandleInput}
          value={userInput.password}
          name="password"
        />
        <div>
          <button
            className=" w-full rounded-md border-white bg-black p-2 text-white"
            onClick={HandleSubmit}
          >
            Sign In
          </button>
          {inputError && <h6 className="flex text-left text-red-700 font-bold">{inputError}</h6>}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
