import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryForm from "@/components/InventoryForm";
import InventoryList from "@/components/InventoryList";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
}

const Home: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  const addItem = (item: InventoryItem) => {
    axios
      .post("http://localhost:5000/api/inventory", item)
      .then((response) => setInventory([...inventory, response.data]))
      .catch((error) => console.error("Error adding item:", error));
  };

  const removeItem = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/inventory/${id}`)
      .then(() => setInventory(inventory.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Restaurant Inventory Manager
      </h1>
      <div className="max-w-4xl mx-auto">
        <InventoryForm addItem={addItem} />
        <InventoryList items={inventory} removeItem={removeItem} />
      </div>
    </div>
  );
};

export default Home;
