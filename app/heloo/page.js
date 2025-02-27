"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function GeneratePDF() {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    // setLoading(true);
    const htmlContent = `<h1 classname="flex text-center">Hello, PDF!</h1><p>This is a PDF generated from HTML.</p>`;

    const response = await fetch(
      "http://localhost:8000/wander-smart/api/generate-trip-plan/",
      {
        method: "POST",
        body: JSON.stringify({ htmlContent }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "generated.pdf";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      toast.message(response.data);
    } else {
      alert("Failed to generate PDF");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Download PDF"}
      </button>
    </div>
  );
}
