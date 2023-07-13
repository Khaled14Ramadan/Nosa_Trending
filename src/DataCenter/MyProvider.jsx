import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
  // Set up the data to be shared
  const [searchInput, setSearchInput] = useState("");

  // Function to update the context value
  const updateSearch = (newValue) => {
    setSearchInput(newValue);
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // export declare type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
  const notify = (msg, type) =>
    toast(msg, {
      position: "bottom-center",
      autoClose: 1750,
      hideProgressBar: false,
      closeOnClick: false,
      type: type,
      draggable: true,
      style: { color: "#25282b", fontWeight: "bold" },
      progress: undefined,
      pauseOnHover: false,
      // toastId: makeid(15),
      theme: "light",
      // onClose: handleCloseToast,
    });

  return (
    <MyContext.Provider value={{ searchInput, updateSearch, notify }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
