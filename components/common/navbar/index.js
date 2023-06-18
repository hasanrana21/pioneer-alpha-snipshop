import UiInput from "@/components/ui/input/UiInput";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar__wrapper">
      <div className="section flex justify-between items-center py-6">
        <h3 className="text-2xl italic">SnipShop</h3>
        <UiInput
          className="w-6/12"
          inputClass="px-10"
          id="search_input"
          placeholder="Search SnipShop .cok"
        />
        <ul className="flex space-x-6">
          <li className="text- text-white cursor-pointer">Account</li>
          <li className="text- text-white cursor-pointer">My Items</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
