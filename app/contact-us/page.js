import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "@/components/contactForm";

function page() {
  return (
    <div className="flex justify-center items-center  h-screen">
      <Card className="min-w-80 justify-center">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            We are here to help you plan your next adventure!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
