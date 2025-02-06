import RestaurantTransactions from "@/app/components/RestaurantTransactions";

export default function DashboardPage() {
  const restaurantId = "353e0707-bbfc-4213-aaaf-e5e34b1f7781"; // Replace with actual ID

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Restaurant Dashboard</h1>
      <RestaurantTransactions restaurantId={restaurantId} />
    </div>
  );
}
