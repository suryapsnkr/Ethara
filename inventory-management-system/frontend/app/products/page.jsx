"use client";
import { useEffect, useState } from "react";

import API from "../services/api";
import ProductForm from "@/components/ProductForm";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const limit = 10;

  const fetchProducts = async () => {
    try {

      const res = await API.get(
        `/products?search=${search}&skip=${
          page * limit
        }&limit=${limit}`
      );

      setProducts(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const createProduct = async (data) => {
    try {

      await API.post("/products", {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity)
      });

      fetchProducts();

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to create product"
      );
    }
  };

  const updateProduct = async (data) => {
    try {

      await API.put(
        `/products/${editingProduct.id}`,
        {
          ...data,
          price: Number(data.price),
          quantity: Number(data.quantity)
        }
      );

      setEditingProduct(null);

      fetchProducts();

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Update failed"
      );
    }
  };

  const deleteProduct = async (id) => {

    if (
      !window.confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/products/${id}`
      );

      fetchProducts();

    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchProducts();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Product Management
      </h1>

      <ProductForm
        onSubmit={
          editingProduct
            ? updateProduct
            : createProduct
        }
        editingProduct={editingProduct}
        onCancel={() =>
          setEditingProduct(null)
        }
      />

      <div className="bg-white p-6 rounded-lg shadow">

        <div className="flex flex-col md:flex-row gap-3 mb-4">

          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded flex-1"
          />

          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-5 rounded"
          >
            Search
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  ID
                </th>

                <th className="border p-3">
                  Name
                </th>

                <th className="border p-3">
                  SKU
                </th>

                <th className="border p-3">
                  Price
                </th>

                <th className="border p-3">
                  Stock
                </th>

                <th className="border p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  <td className="border p-3">
                    {product.id}
                  </td>

                  <td className="border p-3">
                    {product.name}
                  </td>

                  <td className="border p-3">
                    {product.sku}
                  </td>

                  <td className="border p-3">
                    ₹{product.price}
                  </td>

                  <td className="border p-3">

                    <span
                      className={
                        product.quantity <= 5
                          ? "text-red-600 font-bold"
                          : ""
                      }
                    >
                      {product.quantity}
                    </span>

                  </td>

                  <td className="border p-3">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          setEditingProduct(
                            product
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="flex justify-center gap-3 mt-6">

          <button
            disabled={page === 0}
            onClick={() =>
              setPage(page - 1)
            }
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {page + 1}
          </span>

          <button
            onClick={() =>
              setPage(page + 1)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}