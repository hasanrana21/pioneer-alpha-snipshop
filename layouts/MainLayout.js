import Navbar from "@/components/common/navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default MainLayout;
