import { useState, useEffect } from "react";

export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancel
}) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        price: editingProduct.price,
        quantity: editingProduct.quantity
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.sku ||
      !formData.price
    ) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit(formData);

    if (!editingProduct) {
      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: ""
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        {editingProduct
          ? "Update Product"
          : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingProduct
              ? "Update"
              : "Save"}
          </button>

          {editingProduct && (
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