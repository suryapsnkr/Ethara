"use client";
import { useEffect, useState } from "react";

import API from "../services/api";
import OrderForm from "@/components/OrderForm";

export default function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await API.get(
        "/customers?limit=100"
      );

      setCustomers(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products?limit=100"
      );

      setProducts(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

      setOrders(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchOrders();
  }, []);

  const createOrder = async (
    orderData
  ) => {
    try {

      await API.post(
        "/orders",
        orderData
      );

      alert(
        "Order created successfully"
      );

      fetchOrders();
      fetchProducts();

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed to create order"
      );
    }
  };

  const viewOrder = async (
    orderId
  ) => {
    try {

      const res = await API.get(
        `/orders/${orderId}`
      );

      setSelectedOrder(
        res.data
      );

    } catch (error) {
      alert(
        "Failed to fetch order"
      );
    }
  };

  const deleteOrder = async (
    id
  ) => {

    if (
      !window.confirm(
        "Delete order?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/orders/${id}`
      );

      fetchOrders();

    } catch (error) {
      alert(
        "Delete failed"
      );
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Order Management
      </h1>

      <OrderForm
        customers={customers}
        products={products}
        onSubmit={createOrder}
      />

      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  ID
                </th>

                <th className="border p-3">
                  Customer ID
                </th>

                <th className="border p-3">
                  Total
                </th>

                <th className="border p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td className="border p-3">
                    {order.id}
                  </td>

                  <td className="border p-3">
                    {order.customer_id}
                  </td>

                  <td className="border p-3">
                    ₹{order.total_amount}
                  </td>

                  <td className="border p-3">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          viewOrder(order.id)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          deleteOrder(order.id)
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

      </div>

      {selectedOrder && (

        <div className="bg-white shadow rounded-lg p-6">

          <div className="flex justify-between">

            <h2 className="text-xl font-bold">
              Order Details
            </h2>

            <button
              onClick={() =>
                setSelectedOrder(null)
              }
              className="text-red-600"
            >
              Close
            </button>

          </div>

          <div className="mt-4">

            <p>
              <strong>
                Order ID:
              </strong>{" "}
              {selectedOrder.id}
            </p>

            <p>
              <strong>
                Customer ID:
              </strong>{" "}
              {
                selectedOrder.customer_id
              }
            </p>

            <p>
              <strong>
                Total Amount:
              </strong>{" "}
              ₹
              {
                selectedOrder.total_amount
              }
            </p>

            <div className="mt-4">

              <h3 className="font-semibold">
                Order Items
              </h3>

              <table className="w-full border mt-2">

                <thead>

                  <tr>

                    <th className="border p-2">
                      Product ID
                    </th>

                    <th className="border p-2">
                      Quantity
                    </th>

                    <th className="border p-2">
                      Unit Price
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {selectedOrder.items?.map(
                    (
                      item,
                      index
                    ) => (

                      <tr key={index}>

                        <td className="border p-2">
                          {
                            item.product_id
                          }
                        </td>

                        <td className="border p-2">
                          {
                            item.quantity
                          }
                        </td>

                        <td className="border p-2">
                          ₹
                          {
                            item.unit_price
                          }
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}