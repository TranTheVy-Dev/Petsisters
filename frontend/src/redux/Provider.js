"use client";
//Nhúng Provider từ react
import { Provider } from "react-redux";
//Nhúng store
import { store } from "./store";

function Providers({ children }) {
    //truyền cho các component con props đó là store
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;