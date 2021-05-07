import React, { useEffect, useState } from "react";

import { data } from "../data";
import FetchComponent from "./FetchComponent";
import Loading from "./Loading";
const url = "https://course-api.com/react-tours-project";

const FetchingApp = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };

  console.log(data);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const products = await response.json();

      setLoading(false);
      setProducts(products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (products.length === 0) {
    return (
      <main>
        <h2> No Products</h2>
        <button onClick={fetchData}>Get data</button>
      </main>
    );
  }
  return (
    <main>
      <FetchComponent products={products} removeProduct={removeProduct} />
    </main>
  );
};

export default FetchingApp;
