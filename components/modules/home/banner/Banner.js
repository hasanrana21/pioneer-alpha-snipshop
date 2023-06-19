import React, { useEffect, useState } from "react";
import axios from "axios";
const Banner = ({ setCategorySlug, categorySlug }) => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = () => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      const { data } = res;
      setCategories(data);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="bg-[#7DE1EF]">
      <div className="wrapper__container py-5">
        <ul className="flex space-x-8 whitespace-nowrap overflow-x-hidden">
          <li
            className={`text-lg font-medium py-2 cursor-pointer ${
              categorySlug === "all" ? "border-b-[3px] border-blue-500" : ""
            }`}
            onClick={() => setCategorySlug("all")}
          >
            All
          </li>
          {categories.map((category, key) => (
            <li
              key={key}
              className={`text-lg font-medium py-2 cursor-pointer ${
                category === categorySlug
                  ? "border-b-[3px] border-blue-500"
                  : ""
              }`}
              onClick={() => setCategorySlug(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
