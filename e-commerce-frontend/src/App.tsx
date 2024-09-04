// import React, { useEffect, useState } from 'react';
// import { getAllItems } from './services/http.service';
// import { T_Product } from './@types/Types';

// function App() {
//   const [productList, setProductList] = useState<T_Product[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await getAllItems();
//       if(response?.status === 200) {
//         localStorage.setItem('Inventory', JSON.stringify(response?.data?.data));
//         setProductList(response?.data.data);
//       } else {
//         setProductList([]);
//       }
//     } catch (e: any) {
//       console.log('Error: ', e);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* {productList.map((i) => (
//         <p className="text-red-600">{i?.title}</p>
//       ))}
//       <h1 className="m-2 bg-slate-600 p-5 text-red-500">hello world</h1>
//        */}
//        {productList?.length > 0 ? (
//         productList.map((i) => (
//           <div>{i?.title}</div>
//         ))
//        ) : (
//         <div>No products found</div>
//        )}
//     </div>
//   );
// }

// export default App;


import React from "react";
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <Routes>
       <Route
          path="/SignIn"
          element={<SignIn/>}
       />
       <Route
          path="/Home"
          element={<Home/>}
       />
    </Routes>
  </BrowserRouter>
}

export default App;