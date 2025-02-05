import InventoryTransactions from "@/components/InventoryTransactions";

export default function Dashboard() {
  const userId = "d0c67337-071a-4bc6-a547-8bfeb8187d0e"; // Replace with real authentication logic

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <InventoryTransactions userId={userId} />
    </main>
  );
}
