import React from 'react'

import { enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { CalendarRangeIcon, CalenderIcon } from "lucide-react"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export const StepOne = ({ query, handleInputChange, handleSuggestionClick, apiError, suggestions }) => (
    <div className='py-5'>
        <FormField
            name="destination"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Let start with your dream destination.</FormLabel>
                    <FormControl>
                        <div>
                            <Input placeholder="search your place" {...field} value={query} onChange={handleInputChange} />
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

                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            name="tripDuration"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Share the number of days you want to travel</FormLabel>
                    <FormControl>
                        <div>
                            <Input type="number" placeholder="Enter group size" {...field} />


                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    </div>
)
export const StepTwo = () => (<div className="my-4">


    <FormField
        name="groupSize"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Travelling with</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        name="activities"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Trip Vibe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a activity" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Nightlife">Clubs, rooftop bars, or just stargazing with some music </SelectItem>
                        <SelectItem value="Culture">Love history and stories? How about museums, temples, or art tours?</SelectItem>
                        <SelectItem value="Adventure">crave thrills? Think hiking, bungee jumping, or chasing waterfalls!</SelectItem>
                        <SelectItem value="Relaxation">Relaxation</SelectItem>
                        <SelectItem value="Special Activities">something unique about the destination you’d love to try? Yoga retreats, camel rides, or hot air balloons?</SelectItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
)
