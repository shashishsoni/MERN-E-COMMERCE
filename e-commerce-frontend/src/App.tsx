import React, { useState } from "react";
import { getAllItems } from "./services/http.service";
import { T_Product } from "./@types/Types";

function App() {
   
  const [productList, setProductList] = useState<T_Product []>([]);
  
  const fetchData = async () => {
    try {
      const response = await getAllItems();
      setProductList(response?.data.data);
    } catch(e: any) {
      console.log("Error: ", e);
    }
  };

  fetchData();

  return <div>
    {productList.map(i => (<p>
      {i?.title}
    </p>))}
  </div>
}

export default App;