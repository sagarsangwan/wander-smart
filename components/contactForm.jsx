"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import LoadingScreen from "./LoadingScreen";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "enter a valid email" }),
  message: z.string().min(10, { message: "enter atleast 10 character" }),
  type: z
    .string({
      required_error: "Please select a type of message.",
    })
    .refine((value) => value !== "", {
      message: "Please select a type of message.",
    }),
});
function ContactForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      type: "",
    },
  });

  useEffect(() => {
    if (session) {
      form.reset({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        message: "",
        type: "",
      });
    }
  }, [session]);
  async function onSubmit(values) {
    console.log(values);
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact-us", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (result.status === 200) {
        console.log("yusssssssssssssssssss", result.data);
        setIsLoading(false);
        toast.success(result.message);
        return router.push("/");
      } else {
        setIsLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type of message" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="BUG">Bug</SelectItem>
                  <SelectItem value="FEATURE_REQUEST">
                    Feature Request
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ContactForm;
