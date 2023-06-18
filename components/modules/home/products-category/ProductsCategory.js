import UiButton from "@/components/ui/button/UiButton";
import UiInput from "@/components/ui/input/UiInput";
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
  const [updateData, setUpdateData] = useState({});
  const [updateForm, setUpdateForm] = useState({
    title: "",
  });

  //   SET FORM DATA
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   FETCH ALL PRODUCTS
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

  //   PRODUCT DELETE
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

  //   SET UPDATED DATA & OPEN MODAL
  const handleUpdate = async (product) => {
    await setOpenModal(true);
    await setUpdateData(product);
  };

  //   PRODUCT UPDATED
  const handleUpdateForm = (e) => {
    e.preventDefault();
    let payload = {
      title: updateForm.title,
    };
    axios
      .put(`https://dummyjson.com/products/${updateData?.id}`, payload)
      .then((res) => {
        let updatedProduct = products.map((item) => {
          if (res.data?.id === item?.id) {
            item = res.data;
          }
          return item;
        });
        setProducts(updatedProduct);
      })
      .finally(() => setOpenModal(false));
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
                    onClick={() => handleUpdate(product)}
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
              <UiInput
                id="title"
                name="title"
                type="text"
                placeholder="Update Title"
                handleChange={handleChange}
              />
              <UiButton type="submit" label="Submit" />
            </form>
          </UiModal>
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
