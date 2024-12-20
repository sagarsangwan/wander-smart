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

export const StepOne = ({
  query,
  handleInputChange,
  handleSuggestionClick,
  apiError,
  isLoadingSuggestions,
  suggestions,
}) => (
  <div className="py-5 ">
    <FormField
      name="destination"
      render={({ field }) => (
        <FormItem className="relative mb-5">
          <FormLabel>Let start with your dream destination.</FormLabel>
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
            <p className="text-sm text-gray-500 mt-2">Loading suggestions...</p>
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
                  <span className="text-sm">{place.display_name}</span>
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
);
export const StepTwo = () => (
  <div className="my-4">
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
    {/* <FormField
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
    /> */}
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
);
