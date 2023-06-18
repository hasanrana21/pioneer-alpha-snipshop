import UiInput from "@/components/ui/input/UiInput";
import React from "react";
import { FaBars, FaUser, FaRegHeart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar__wrapper">
      <div className="wrapper__container navbar__container">
        <h3 className="text-2xl italic">SnipShop</h3>
        <UiInput
          className="w-6/12 mb-0"
          inputClass="px-10"
          id="search_input"
          placeholder="Search SnipShop .cok"
        />
        <ul className="flex items-center space-x-6">
          <li className="text- text-white cursor-pointer">
            <FaUser className="inline mr-1" /> Account
          </li>
          <li className="text- text-white cursor-pointer">
            <FaRegHeart className="inline mr-1" />
            My Items
          </li>
          <li className="text-xl text-white">
            <FaBars />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
