import React, { useEffect } from "react";

// INTERNAL IMPORT
import { useStateContext } from "../Context/index";

const index = () => {
  const { TOKEN_ICO, fetchInitialData, transferNativeToken } = useStateContext();
  useEffect(() => {
    fetchInitialData();
  }, []);
  return <div>
    <h1>{TOKEN_ICO}</h1>
    <button onClick={()=> transferNativeToken()} >Transfer</button>
    </div>;
};

export default index;