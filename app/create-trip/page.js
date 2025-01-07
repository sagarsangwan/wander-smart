"use client";
import { useState, useRef } from "react";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { StepOne, StepTwo } from "@/components/trip/trip-input-steps";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import PlanExpired from "@/components/trip/planExpired";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

const stepSchemas = [
  z.object({
    destination: z.string().min(1, "Destination is required"),
    tripDuration: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 1, {
        message: "Trip duration must be at least 1 day.",
      }),
  }),
  z.object({
    groupSize: z.string().min(1, "Group size must be at least 1"),
    // activities: z.string().min(1, "please select atleast one activity"),
    budget: z.string().min(3, "please fill your budget in ruppes"),
  }),
];
const fullSchemas = stepSchemas.reduce(
  (acc, schema) => acc.merge(schema),
  z.object({})
);

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const totalSteps = stepSchemas.length;
  const methods = useForm({
    resolver: zodResolver(fullSchemas),
    defaultValues: {
      destination: "",
      tripDuration: 1,
      groupSize: "",
      // activities: "",
      budget: "",
    },
  });
  const handleNext = () => {
    const currentSchemas = stepSchemas[step];
    const currentStepData = methods.getValues();
    const currentvalidation = currentSchemas.safeParse(currentStepData);
    if (currentvalidation.success) {
      setStep(step + 1);
    } else {
      console.log("error");
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await fetch("/api/generate-trip-plan", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await result.json();
      if (res.status === 500) {
        toast.error(res.message);
        setLoading(false);
        return router.push(`/pricing`);
      }
      if (res.status === 200) {
        toast.message(res.message);
        return router.push(`/my-trips/${res.data.slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
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
        // console.error("Error fetching suggestions:", error);
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
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(userInput);
    }, 300);
  };
  const handleSuggestionClick = (place) => {
    setQuery(place.display_name);
    methods.setValue("destination", place.display_name);
    setSuggestions([]);
  };
  if (!session) {
    return redirect("/login");
  }

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {session?.user?.balance === 0 && session?.user?.freePlanUsed >= 3 ? (
        <PlanExpired />
      ) : (
        <div className=" h-screen">
          <FormProvider {...methods}>
            <div className=" max-w-md mx-auto p-4 ">
              <Progress
                className="my-4"
                value={((step + 1) / totalSteps) * 100}
              />
              <form onSubmit={methods.handleSubmit(onSubmit)} className="my-10">
                {step === 0 && (
                  <StepOne
                    isLoadingSuggestions={isLoadingSuggestions}
                    suggestions={suggestions}
                    apiError={apiError}
                    query={query}
                    handleInputChange={handleInputChange}
                    handleSuggestionClick={handleSuggestionClick}
                  />
                )}
                {step === 1 && <StepTwo />}
                {/* {step === 2 && <StepThree />} */}
                <div className="flex justify-between mt-6">
                  {loading ? (
                    <Button>loading...</Button>
                  ) : (
                    <>
                      {" "}
                      <Button onClick={handleBack} disabled={step === 0}>
                        back
                      </Button>
                      {step < totalSteps - 1 ? (
                        <Button onClick={handleNext}>next</Button>
                      ) : (
                        <Button type="submit">submit</Button>
                      )}
                    </>
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
