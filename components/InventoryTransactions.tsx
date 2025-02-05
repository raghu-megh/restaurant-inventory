import { inventoryTransactions } from "@/lib/actions/inventory.actions";

interface InventoryTransactionsProps {
  userId: string;
}

export default async function InventoryTransactions({
  userId,
}: InventoryTransactionsProps) {
  let transactions;

  try {
    transactions = await inventoryTransactions(userId);
  } catch (error) {
    return <p className="text-red-500">Error loading transactions.</p>;
  }

  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <ul className="space-y-3">
        {transactions.map((txn) => (
          <li key={txn.id} className="border-b pb-2">
            <p className="font-semibold">
              {txn.inventoryItem.name} ({txn.inventoryItem.category})
            </p>
            <p>
              {txn.type} - {txn.quantity} {txn.unit} on{" "}
              {new Date(txn.createdAt).toLocaleDateString()}
            </p>
            {txn.description && (
              <p className="text-gray-600">&quot;{txn.description}&quot;</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
