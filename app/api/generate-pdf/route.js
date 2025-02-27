import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "PDF generation failed" }), {
      status: 500,
    });
  }
}
