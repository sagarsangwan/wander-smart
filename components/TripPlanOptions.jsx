"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TripPlanOptions({ tripId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function deleteCurrentTripPlan(tripId) {
    console.log(tripId);
    try {
      setIsLoading(true);
      const res = await fetch(`/api/generate-trip-plan/${tripId}`, {
        method: "POST",
      });
      const result = await res.json();
      if (result.status === 200) {
        console.log("yusssssssssssssssssss");
        setIsLoading(false);

        toast.success(result.message);
        return router.push("/");
      } else {
        setIsLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
      setIsLoading(true);
      toast.error("something went wrong Try again after sometime");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-red-500">
          Delete
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>You want to delete it</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              className="text-red-500"
              onClick={() => deleteCurrentTripPlan(tripId)}
            >
              Yes, Delete
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button>No, Cancel</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TripPlanOptions;
