import { useState, useEffect } from "react";

export default function CustomerForm({
  onSubmit,
  editingCustomer,
  onCancel
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        full_name: editingCustomer.full_name || "",
        email: editingCustomer.email || "",
        phone: editingCustomer.phone || ""
      });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.email
    ) {
      alert("Name and Email are required");
      return;
    }

    onSubmit(formData);

    if (!editingCustomer) {
      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        {editingCustomer
          ? "Update Customer"
          : "Add Customer"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingCustomer
              ? "Update"
              : "Save"}
          </button>

          {editingCustomer && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}