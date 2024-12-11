import React from 'react'

import { enUS } from "date-fns/locale";

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
    <div>
        <FormField
            name="destination"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>destination</FormLabel>
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

    </div>
)
export const StepTwo = () => (
    <>
        <FormField
            name="startDate"
            render={({ field }) => (
                <FormItem>
                    <label>Start Date</label>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            name="endDate"
            render={({ field }) => (
                <FormItem>
                    <label>End Date</label>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
)
