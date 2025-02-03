"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  inventoryItem: { name: string };
  user: { name: string };
  type: "PURCHASE" | "USAGE" | "WASTAGE";
  quantity: number;
  unit: string;
  date: string;
  description?: string;
}

export default function TransactionDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <Card className="w-full max-w-6xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Transaction Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.inventoryItem.name}</TableCell>
                  <TableCell>{txn.user.name}</TableCell>
                  <TableCell
                    className={`font-medium ${
                      txn.type === "PURCHASE"
                        ? "text-green-600"
                        : txn.type === "USAGE"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.type}
                  </TableCell>
                  <TableCell>
                    {txn.quantity} {txn.unit}
                  </TableCell>
                  <TableCell>
                    {new Date(txn.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{txn.description || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
