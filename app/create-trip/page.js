"use client";
import { useState, useRef } from "react";
import { z } from "zod";
import React from "react";

import { Search, MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import PlanExpired from "@/components/trip/planExpired";
import { toast } from "sonner";

const formSchemas = z.object({
  destination: z.string().min(1, "Destination is required"),
  tripDuration: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => value >= 1, {
      message: "Trip duration must be at least 1 day.",
    }),
  groupSize: z.string().min(1, "Group size must be at least 1"),
  budget: z.string().min(3, "please fill your budget in ruppes"),
});

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(formSchemas),
    defaultValues: {
      destination: "",
      tripDuration: 1,
      groupSize: "",
      // activities: "",
      budget: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (session?.user?.balance === 0 && session.user?.freePlanUsed === 3) {
        toast.error(res.message);
        setLoading(false);
        return router.push(`/pricing`);
      }
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/wander-smart/api/generate-trip-plan/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await result.json();
      if (!result.ok) {
        toast.error(res.message);
        setLoading(false);
        return router.refresh();
      }

      toast.success(res.message);
      const updateToDb = await fetch("/api/create-trip-plan", {
        method: "POST",
        body: JSON.stringify(res.data),
      });
      const updateToDbResult = await updateToDb.json();
      if (!updateToDb.ok) {
        toast.error(updateToDbResult.message);
        setLoading(false);
        return router.refresh();
      }
      toast.success(updateToDbResult.message);
      setLoading(false);
      return router.push(`/my-trips/${res.data.slug}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchSuggestions = async (input) => {
    if (input.length > 2) {
      setIsLoadingSuggestions(true);
      try {
        const response = await fetch("/api/location", {
          method: "POST",
          body: JSON.stringify({ q: input }),
        });
        const data = await response.json();
        if (response.ok) {
          setApiError("");
          setIsLoadingSuggestions(false);
          setSuggestions(data);
        } else {
          setApiError(data.error);
          setIsLoadingSuggestions(false);
          setSuggestions([]);
        }
      } catch (error) {
        setApiError(error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setApiError("search atleast three word");
    }
  };
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    methods.setValue("destination", "");
    setQuery(userInput);
    if (userInput.length > 2) {
      // Add minimum input length check
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        fetchSuggestions(userInput);
      }, 300);
    } else {
      setSuggestions([]);
      setApiError("search atleast three word");
    }
  };
  const handleSuggestionClick = (place) => {
    setQuery(place.display_name);
    methods.setValue("destination", place.display_name);
    setSuggestions([]);
  };
  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      {session?.user?.balance === 0 && session?.user?.freePlanUsed >= 3 ? (
        <PlanExpired />
      ) : (
        <div className=" h-screen">
          <FormProvider {...methods}>
            <div className=" max-w-md mx-auto p-4 ">
              <form onSubmit={methods.handleSubmit(onSubmit)} className="my-10">
                <div className="py-5 ">
                  <FormField
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="relative mb-5">
                        <FormLabel>
                          Let start with your dream destination.
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              placeholder="Search your place"
                              {...field}
                              value={query}
                              onChange={handleInputChange}
                              // onKeyDown={handleKeyDown}
                              className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </FormControl>
                        {isLoadingSuggestions && (
                          <p className="text-sm text-gray-500 mt-2">
                            Loading suggestions...
                          </p>
                        )}
                        {apiError.length > 0 && <span>{apiError}</span>}
                        {suggestions.length > 0 && (
                          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((place) => (
                              <li
                                key={place.place_id}
                                onClick={() => handleSuggestionClick(place)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                              >
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="text-sm">
                                  {place.display_name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="tripDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Share the number of days you want to travel
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              type="number"
                              placeholder="Enter group size"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="groupSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travelling with</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of traveller" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Couple">Couple </SelectItem>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Family">Family</SelectItem>
                            <SelectItem value="Friends">Friends</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trip Budget</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cheap">Cheap </SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between mt-6">
                  {loading ? (
                    <Button>
                      Generating... please wait Backend is hosted on free plan
                      it may take extra 5 seconds
                    </Button>
                  ) : (
                    <Button type="submit">submit</Button>
                  )}
                </div>
              </form>
            </div>
          </FormProvider>
        </div>
      )}
    </>
  );
}

export default Page;
