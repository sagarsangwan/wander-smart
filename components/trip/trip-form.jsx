"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { es } from "date-fns/locale";
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
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const formSchema = z.object({
    destination: z.string().min(2).max(50),
    preferences: z
        .string({
            required_error: "Please select an preferences to display.",
        }),
    travelDates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
})

// const InterestAndActivity =
function TripForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            destination: "",
            travelDates: { from: undefined, to: undefined },
            preferences: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="travelDates"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Travel Dates  </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[300px] justify-start text-left font-normal",
                                                !field.value?.from && !field.value?.to && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                    <>
                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                        {format(field.value.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(field.value.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarRangeIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        locale={es}
                                        // disabled={
                                        // new DateTime()>new DateTi
                                        // }/
                                        defaultMonth={field.value?.from}
                                        selected={field.value}
                                        onSelect={(range) => field.onChange(range)}

                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your Travel Dates   is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferences</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified preferences to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default TripForm
