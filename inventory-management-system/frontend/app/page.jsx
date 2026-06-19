"use client";
import { useEffect, useState } from "react";
import API from "./services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: []
  });

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/summary");

      setSummary(res.data);
    } catch (error) {
      console.error(error);

      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Inventory & Order Management Overview
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500">
            Total Products
          </h3>

          <p className="text-4xl font-bold mt-2">
            {summary.total_products}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500">
            Total Customers
          </h3>

          <p className="text-4xl font-bold mt-2">
            {summary.total_customers}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500">
            Total Orders
          </h3>

          <p className="text-4xl font-bold mt-2">
            {summary.total_orders}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500">
            Low Stock Items
          </h3>

          <p className="text-4xl font-bold mt-2 text-red-500">
            {summary.low_stock_products.length}
          </p>
        </div>

      </div>

      {/* Low Stock Products */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Low Stock Products
        </h2>

        {summary.low_stock_products.length === 0 ? (
          <div className="text-green-600">
            No low stock products
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead>

                <tr className="bg-gray-100">

                  <th className="border p-3 text-left">
                    ID
                  </th>

                  <th className="border p-3 text-left">
                    Product Name
                  </th>

                  <th className="border p-3 text-left">
                    Quantity
                  </th>

                  <th className="border p-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {summary.low_stock_products.map(
                  (product) => (
                    <tr key={product.id}>

                      <td className="border p-3">
                        {product.id}
                      </td>

                      <td className="border p-3">
                        {product.name}
                      </td>

                      <td className="border p-3">
                        {product.quantity}
                      </td>

                      <td className="border p-3">

                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                          Low Stock

                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}