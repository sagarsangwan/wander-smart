"use client"
import { useState, useRef } from "react"
import { z } from "zod"

import React from 'react'

import { Input } from "@/components/ui/input"
// import { Span } from "next/dist/trace"


const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
function Page() {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [selectedPlace, setSelectedPlace] = useState("")
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
        setSelectedPlace(place.display_name)
        setQuery(place.display_name)
        setSuggestions([])
    }


    return (
        <div>
            {/* <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl> */}
            <Input placeholder="search your place" value={query} onChange={handleInputChange} />
            {apiError.length > 0 && (
                <span>{apiError}</span>
            )}
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((place) => (

                        <li key={place.place_id} onClick={() => handleSuggestionClick(place)}>{place.display_name}</li>
                    ))}
                </ul>
            )}
            {selectedPlace && (
                <p className="mt-4">
                    <strong>Selected Place:</strong> {selectedPlace}
                </p>
            )}
            {/* </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form> */}
        </div>
    )
}

export default Page
