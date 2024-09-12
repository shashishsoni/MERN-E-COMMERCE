import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import AVI from '../../assets/first-bg.avif';
import { getInventory } from '../../services/http.service';
import { T_Product } from '../../@types/Types';
import { useAppContext } from '../../context/AppContext';

function Home() {
  const { Cart, setUserCart } = useAppContext();
  const [inventory, setInventory] = useState<T_Product[]>([]);

  const fetchData = async () => {
    try {
      const resp = await getInventory();
      if (resp?.status === 200) {
        setInventory(resp?.data?.data);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };
  
  const addToCart = (product: T_Product) => {
    const existingItem = Cart.find(item => item._id === product._id);
  
    if (existingItem) {
      setUserCart(
        Cart.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setUserCart([
        ...Cart,
        { ...product, quantity: 1 } // Ensure new items start with quantity 1
      ]);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />

      <section className="m-5">
        <div className="first_bg mx-auto mb-5 mt-6 flex w-full items-center justify-between rounded-lg border-[1px] bg-[#9575cd] p-8 text-white shadow-2xl">
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
          <h1 className="m-5 mt-20 justify-center text-center font-protest text-5xl text-[5.25rem] text-[#512da8]">
            ANIME MERCHANDISE
          </h1>
          <p className="m-5 mt-2 justify-center p-8 text-center font-pixelify text-5xl text-[2rem] text-[#512da8]">
            Unleash your inner otaku with exclusive anime merchandise—bring home
            the characters, stories, and adventures you love, and make your
            collection truly legendary!
          </p>
        </div>

        <div className="m-5 mt-10 grid grid-cols-4 gap-4 gap-y-14">
          {inventory?.map((item) => (
            <div key={item._id}>
              <div
                className="flex aspect-square w-full items-center justify-center bg-white shadow-2xl"
                style={{ borderRadius: '30% 30% 0% 30%' }}
              >
                <img src={item.image} className="w-[60%]"/>
              </div>
              <div
                className="item-end ml-[95px] mt-4 flex w-3/4 justify-end border-[2px] text-[#212121] shadow-2xl"
                style={{ borderRadius: '15px 15px 0px 15px' }}
              >
                <div className="mr-3">
                  <h2 className="justify-end text-end font-serif text-[20px] font-bold">
                    {item.name}
                  </h2>
                  <h3 className="font-light justify-end text-end text-[20px]">
                    {item.category}
                  </h3>
                  <h3 className="justify-end text-end text-[20px] font-semibold">
                    Rs {item.price}
                  </h3>
                </div>
              </div>
              <button
                className="gap-x-6 mt-[20px] w-full bg-[#ede7f6] p-3 text-center text-[20px] shadow-2xl"
                style={{ borderRadius: '15px 15px 0px 15px' }}
                onClick={() => addToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
