import RestaurantTransactions from "@/app/components/RestaurantTransactions";

export default function DashboardPage() {
  const restaurantId = "31ea92da-5ef3-4c5d-9272-219d8dbb7f69"; // Replace with actual ID

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Restaurant Dashboard</h1>
      <RestaurantTransactions restaurantId={restaurantId} />
    </div>
  );
}
