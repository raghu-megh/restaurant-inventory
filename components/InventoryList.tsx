import React from "react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
}

interface InventoryListProps {
  items: InventoryItem[];
  removeItem: (id: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, removeItem }) => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Inventory List</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No inventory items added.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 shadow-md bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit</th>
                <th className="border p-2">Expiry Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">{item.expiryDate}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
