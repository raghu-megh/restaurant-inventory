"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  description: string | null;
  type: string;
  quantity: number;
  unit: string;
  createdAt: string;
  inventory: { name: string };
  user: { name: string; email: string };
}

export default function TransactionsList({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(`/api/transactions/${restaurantId}`);
        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
        console.log("data length is ", data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [restaurantId]);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Inventory History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li key={txn.id} className="p-3 border rounded-md bg-gray-50">
              <p>
                <span className="font-semibold">{txn.inventory.name}</span> -{" "}
                {txn.quantity} {txn.unit} ({txn.type})
              </p>
              <p className="text-sm text-gray-600">
                By: {txn.user.name} ({txn.user.email})
              </p>
              <p className="text-xs text-gray-500">
                On: {new Date(txn.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
