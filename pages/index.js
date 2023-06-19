import Banner from "@/components/modules/home/banner/Banner";
import ProductsCategory from "@/components/modules/home/products-category/ProductsCategory";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

export default function Home() {
  const [categorySlug, setCategorySlug] = useState("all");
  console.log("setCategorySlug", categorySlug);
  return (
    <MainLayout>
      <Banner setCategorySlug={setCategorySlug} categorySlug={categorySlug} />
      <ProductsCategory categorySlug={categorySlug} />
    </MainLayout>
  );
}
