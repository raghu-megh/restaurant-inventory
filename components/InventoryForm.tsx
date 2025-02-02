import React, { useState } from "react";

interface InventoryItem {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
}

interface InventoryFormProps {
  addItem: (item: InventoryItem) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ addItem }) => {
  const [item, setItem] = useState<InventoryItem>({
    name: "",
    quantity: 0,
    unit: "",
    expiryDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.name && item.quantity && item.unit && item.expiryDate) {
      addItem(item);
      setItem({ name: "", quantity: 0, unit: "", expiryDate: "" });
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Add Inventory Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        className="w-full p-2 border rounded mb-2"
        value={item.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        className="w-full p-2 border rounded mb-2"
        value={item.quantity}
        onChange={handleChange}
        required
      />
      <select
        name="unit"
        className="w-full p-2 border rounded mb-2"
        value={item.unit}
        onChange={handleChange}
        required
      >
        <option value="">Select Unit</option>
        <option value="kg">Kg</option>
        <option value="liters">Liters</option>
        <option value="pieces">Pieces</option>
      </select>
      <input
        type="date"
        name="expiryDate"
        className="w-full p-2 border rounded mb-2"
        value={item.expiryDate}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default InventoryForm;
