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
    <div>
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

    </div>
)
export const StepTwo = () => (
    <>
        <p className=' font-semibold mb-4'>Pick your travel dates to get started</p>
        <FormField
            name="startDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Trip Start Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            name="endDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Trip End Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <FormMessage />
                </FormItem>
            )}
        />

    </>
)
export const StepThree = () => (
    <FormField
        name="groupSize"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Share the number of travelers joining you on this adventure</FormLabel>
                <FormControl>
                    <div>
                        <Input type="number" placeholder="Enter group size" {...field} />


                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)
