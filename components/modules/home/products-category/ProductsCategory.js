import UiLoader from "@/components/ui/loader/UiLoader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsCategory = ({ categorySlug }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const fetchProducts = async () => {
    setLoading(true);
    let productsUrl =
      categorySlug === "all"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${categorySlug}`;

    await axios
      .get(productsUrl)
      .then((res) => {
        const { products } = res?.data;
        setProducts(products);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchProducts();
  }, [categorySlug]);

  const deleteProduct = async (id) => {
    setDeletedId(id);
    await axios.delete(`https://dummyjson.com/products/${id}`).then((res) => {
      if (res?.data?.isDeleted) {
        let deleted = products.filter((item) => item?.id !== id);
        setProducts(deleted);
      }
    });
  };
  return (
    <div className="section">
      <div className="section__content">
        <h2 className="text-3xl font-medium my-2">Shop by Category</h2>
        <p className="text-lg my-2">
          Life is hard enough already. Let us <br /> make it a little easier.
        </p>
      </div>
      {loading ? (
        <UiLoader />
      ) : (
        <div className="grid grid-flow-row grid-cols-5 gap-5">
          {products.map((product, key) =>
            deletedId === product?.id ? (
              <UiLoader />
            ) : (
              <div key={key} className="card__wrapper border rounded-xl p-6">
                <div
                  className="w-full h-64 rounded-b-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${product?.thumbnail})` }}
                ></div>
                <h4 className="text-lg font-medium my-4">{product?.title}</h4>
                <p>${product?.price}</p>
                <div className="my-2 text-end">
                  <button onClick={() => deleteProduct(product?.id)}>
                    Del
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
