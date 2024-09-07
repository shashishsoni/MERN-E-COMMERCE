import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import AVI from '../../assets/first-bg.avif';
import { getInventory } from '../../services/http.service';
import { T_Product } from '../../@types/Types';

function Home() {
  const [inventory, setinventory] = useState<T_Product[]>([]);

  const FetchData = async () => {
    try {
      const resp = await getInventory();
      if (resp?.status === 200) {
        setinventory(resp?.data?.data);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchData();
  },[]);

  return (
    <div>
      <NavBar />

      <section className="m-5">
        <div className="first_bg mx-auto flex w-full items-center justify-between rounded-lg border-[1px] bg-[#9575cd] p-8 text-white shadow-2xl mt-6 mb-5">
          {/* Left Section - Text Content */}
          <div className="mb-[50px] ml-[115px] w-1/2 space-y-4">
            <h1 className="font-protest text-5xl text-[5.25rem] text-[#512da8]">
              We bring your favorite anime world to your door
            </h1>
            <p className="font-pixelify text-[1.5rem] text-lg text-[#512da8]">
              Shop exclusive anime merchandise and collectibles with discounts
              of up to 4% off on your favorite items.
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="flex w-1/2 justify-between">
            <img
              src={AVI}
              alt="first-bg"
              className="h-auto max-w-full"
              style={{ borderRadius: '0px 50% 30% 36%' }}
            />
          </div>
        </div>

        <div>
        <h1 className="font-protest text-5xl text-[5.25rem] text-[#512da8] mt-20 m-5 justify-center text-center">
              ANIME MERCHANDISE
            </h1>
        <p className=' font-pixelify text-5xl text-[2rem] text-[#512da8] mt-2 m-5 justify-center text-center p-8'>
        Unleash your inner otaku with exclusive anime merchandise—bring home the characters, stories, and adventures you love, and make your collection truly legendary!
        </p>
        </div>

        <div className="grid grid-cols-4 gap-4 border-[3px] mt-10 m-5">
          {inventory?.map((item) => 
          <div key={item._id} className='border-[3px]'>
            <div className='aspect-square w-full shadow-md bg-white' style={{ borderRadius: '30% 30% 0% 30%' }} >{item.name}</div>
            </div>)}
        </div>
      </section>
    </div>
  );
}

export default Home;
