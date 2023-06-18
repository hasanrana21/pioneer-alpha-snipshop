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
  const [modalKey, setModalKey] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    thumbnail: "",
  });

  //   SET FORM DATA
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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

  //   HANDLE CREATE AND UPDATE MODAL
  const handleModal = async (product, key) => {
    await setOpenModal(true);
    if (key === "update") {
      await setUpdateData(product);
      setModalKey("update");
    } else {
      setModalKey("create");
    }
  };

  //   PRODUCT CREATE & UPDATE FEATURE
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (modalKey === "update") {
      let updatePayload = {
        title: formData.title,
      };
      axios
        .put(`https://dummyjson.com/products/${updateData?.id}`, updatePayload)
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
    } else {
      let payload = formData;
      axios
        .post("https://dummyjson.com/products/add", payload)
        .then((res) => {
          res.data.id = products.length + 1;
          products.unshift(res?.data);
        })
        .finally(() => setOpenModal(false));
    }
  };
  return (
    <div className="wrapper__container">
      <div className="section__content my-10">
        <h2 className="text-3xl font-medium my-2">Shop by Category</h2>
        <p className="text-lg my-2">
          Life is hard enough already. Let us <br /> make it a little easier.
        </p>
        <span>
          <UiButton label="Add Product" onClick={handleModal} />
        </span>
      </div>
      {loading ? (
        <UiLoader />
      ) : (
        <div className="grid grid-flow-row grid-cols-5 gap-5">
          {products.map((product, key) =>
            deletedId === product?.id ? (
              <UiLoader />
            ) : (
              // PRODUCT LIST
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
                    onClick={() => handleModal(product, "update")}
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

          {/* CREATE & UPDATE MODAL */}
          <UiModal
            title={modalKey === "update" ? "Product Update" : "Create Product"}
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <form onSubmit={handleSubmitForm}>
              {modalKey === "update" ? (
                <UiInput
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Update Title"
                  handleChange={handleChange}
                />
              ) : (
                <>
                  <UiInput
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Add Title"
                    handleChange={handleChange}
                  />
                  <UiInput
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Add Price"
                    handleChange={handleChange}
                  />
                  <UiInput
                    id="thumbnail"
                    name="thumbnail"
                    type="text"
                    placeholder="Add Image Url"
                    handleChange={handleChange}
                  />
                </>
              )}
              <UiButton type="submit" label="Submit" />
            </form>
          </UiModal>
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
