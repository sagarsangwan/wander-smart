"use client"
import { useState, useRef } from "react"
import { z } from "zod"
import { Progress } from "@/components/ui/progress"


import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepOne, StepTwo } from "@/components/trip/trip-input-steps"

const stepSchemas = [
    z.object({ destination: z.string().min(1, "Destination is required") }),
    z.object({
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
    }),
    // z.object({ groupSize: z.number().min(1, "Group size must be at least 1") }),
];

function Page() {
    const [step, setStep] = useState(0)
    const totalSteps = stepSchemas.length
    const methods = useForm({
        resolver: zodResolver(stepSchemas[step]),
        defaultValues: {
            destination: "",
            startDate: "",
            endDate: "",
            groupSize: 1
        }
    })
    const handleNext = (data) => {
        if (step < totalSteps - 1) {
            setStep(step + 1)
            console.log(data)
        } else {
            console.log("form submitted", data)
        }
    }
    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [apiError, setApiError] = useState("")
    const debounceTimeout = useRef(null);

    const fetchSuggestions = async (input) => {
        console.log("inside fetchsuhggestionsssssssssssss ")
        console.log(input.length)

        if (input.length > 2) {
            try {
                console.log("inside fetchsuhggestionsssssssssssss tryy")
                const response = await fetch("/api/location",
                    {
                        method: "POST",
                        body: JSON.stringify({ q: input })
                    }
                )
                const data = await response.json()
                console.log(data, "dataaaaaaaaaaa")
                if (response.ok) {
                    setApiError("")
                    setSuggestions(data)
                }
                else {
                    console.error("Error fetching suggestions:", data.error);
                    setApiError(data.error)
                    setSuggestions([])
                }
            }
            catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([])
            setApiError("search atleast three word")
        }
    }
    const handleInputChange = (e) => {
        const userInput = e.target.value
        setQuery(userInput)
        console.log("hihihih", userInput)
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }
        debounceTimeout.current = setTimeout(() => {
            console.log("before timeouut")
            fetchSuggestions(userInput);
        }, 300);
    }
    const handleSuggestionClick = (place) => {
        setQuery(place.display_name)
        methods.setValue("destination", place.display_name)
        setSuggestions([])
    }


    return (
        <div>
            <FormProvider {...methods}>
                <div className="max-w-md mx-auto p-4">
                    <Progress value={((step + 1) / totalSteps * 100)} />
                    <form onSubmit={methods.handleSubmit(handleNext)} >
                        {step === 0 && <StepOne suggestions={suggestions} apiError={apiError} query={query} handleInputChange={handleInputChange} handleSuggestionClick={handleSuggestionClick} />}
                        {step === 1 && <StepTwo />}
                        <div className="flex justify-between">
                            <Button onClick={handleBack} disabled={step === 0}>back</Button>
                            <Button type="submit">{(step < totalSteps - 1) ? "next" : "submit"}</Button>
                        </div>
                    </form>
                </div>
            </FormProvider>
        </div>
    )
}

export default Page
