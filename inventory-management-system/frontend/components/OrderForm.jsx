import { useEffect, useState } from "react";

export default function OrderForm({
  customers,
  products,
  onSubmit
}) {
  const [customerId, setCustomerId] = useState("");

  const [items, setItems] = useState([
    {
      product_id: "",
      quantity: 1
    }
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    let sum = 0;

    items.forEach((item) => {
      const product = products.find(
        (p) => p.id === Number(item.product_id)
      );

      if (product) {
        sum += product.price * item.quantity;
      }
    });

    setTotal(sum);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product_id: "",
        quantity: 1
      }
    ]);
  };

  const updateItem = (
    index,
    field,
    value
  ) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Select customer");
      return;
    }

    onSubmit({
      customer_id: Number(customerId),
      items: items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity)
      }))
    });

    setCustomerId("");

    setItems([
      {
        product_id: "",
        quantity: 1
      }
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Create Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
          className="w-full border p-3 rounded"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        {items.map((item, index) => (

          <div
            key={index}
            className="grid md:grid-cols-3 gap-3"
          >

            <select
              value={item.product_id}
              onChange={(e) =>
                updateItem(
                  index,
                  "product_id",
                  e.target.value
                )
              }
              className="border p-3 rounded"
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                  {" | Stock: "}
                  {product.quantity}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateItem(
                  index,
                  "quantity",
                  e.target.value
                )
              }
              className="border p-3 rounded"
            />

            <button
              type="button"
              onClick={() =>
                removeItem(index)
              }
              className="bg-red-600 text-white rounded px-3"
            >
              Remove
            </button>

          </div>

        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

        <div className="text-xl font-bold">
          Total: ₹{total.toFixed(2)}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Create Order
        </button>

      </form>

    </div>
  );
}