import UiButton from "@/components/ui/button/UiButton";
import UiLoader from "@/components/ui/loader/UiLoader";
import UiModal from "@/components/ui/modal/UiModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const ProductsCategory = ({ categorySlug }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [form, setForm] = useState({
    title: "",
  });
  console.log("inpu", form.title);
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
        setDeletedId(null);
      }
    });
  };

  const updateProduct = (id) => {
    setOpenModal(true);
    setUpdateId(id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    console.log("form", form);
  };
  return (
    <div className="section">
      <div className="section__content my-10">
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
                <p>$ {product?.price}</p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="text-2xl"
                    onClick={() => updateProduct(product?.id)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-2xl"
                    onClick={() => deleteProduct(product?.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )
          )}

          <UiModal
            title="Product Update"
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <form onSubmit={handleUpdateForm}>
              <input type="text" name="title" onChange={handleChange} />
              <UiButton type="submit" label="Submit" />
            </form>
          </UiModal>
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
