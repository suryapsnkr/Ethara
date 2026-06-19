"use client";
import { useEffect, useState } from "react";

import API from "../services/api";
import CustomerForm from "@/components/CustomerForm";

export default function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(0);

  const limit = 10;

  const fetchCustomers = async () => {
    try {

      const res = await API.get(
        `/customers?search=${search}&skip=${
          page * limit
        }&limit=${limit}`
      );

      setCustomers(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const createCustomer = async (
    data
  ) => {
    try {

      await API.post(
        "/customers",
        data
      );

      fetchCustomers();

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to create customer"
      );
    }
  };

  const updateCustomer = async (
    data
  ) => {
    try {

      await API.put(
        `/customers/${editingCustomer.id}`,
        data
      );

      setEditingCustomer(null);

      fetchCustomers();

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to update customer"
      );
    }
  };

  const deleteCustomer = async (
    id
  ) => {

    if (
      !window.confirm(
        "Delete customer?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/customers/${id}`
      );

      fetchCustomers();

    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchCustomers();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Customer Management
      </h1>

      <CustomerForm
        editingCustomer={
          editingCustomer
        }
        onSubmit={
          editingCustomer
            ? updateCustomer
            : createCustomer
        }
        onCancel={() =>
          setEditingCustomer(null)
        }
      />

      <div className="bg-white p-6 rounded-lg shadow">

        <div className="flex flex-col md:flex-row gap-3 mb-4">

          <input
            type="text"
            placeholder="Search Customer"
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
                  Email
                </th>

                <th className="border p-3">
                  Phone
                </th>

                <th className="border p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.map(
                (customer) => (

                  <tr
                    key={customer.id}
                  >

                    <td className="border p-3">
                      {customer.id}
                    </td>

                    <td className="border p-3">
                      {
                        customer.full_name
                      }
                    </td>

                    <td className="border p-3">
                      {
                        customer.email
                      }
                    </td>

                    <td className="border p-3">
                      {
                        customer.phone
                      }
                    </td>

                    <td className="border p-3">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setEditingCustomer(
                              customer
                            )
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteCustomer(
                              customer.id
                            )
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

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