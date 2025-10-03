"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BankBalance() {
  const [balance, setBalance] = useState(12530.75);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    const newBalance = parseFloat(inputValue);
    if (!isNaN(newBalance)) {
      setBalance(newBalance);
    }
    setIsEditing(false);
    setInputValue("");
  };

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Bank Balance</CardTitle>
        <CardDescription>
          Your current available bank balance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="flex items-end gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="balance">New Balance</Label>
              <Input
                type="number"
                id="balance"
                placeholder="Enter new balance"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        ) : (
          <p className="text-4xl font-bold tracking-tighter">
            {formattedBalance}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Update Balance
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
