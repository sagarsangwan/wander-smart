import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateStyledPDF(tripData) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();




    // Add a page to the document
    const page = pdfDoc.addPage([600, 800]);
    const {  height } = page.getSize();
    const sanitizeText = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    // Set up fonts
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    let y = height - 50;

    // Utility function to draw text
    const drawText = (text, x, y, options = {}) => {
        const { font = boldFont, size = 12, color = rgb(0, 0, 0) } = options;
        page.drawText(sanitizeText(text), { x, y, size, font, color });
    };

    // Draw Trip Name
    drawText(tripData.tripName, 50, y, {  size: 18, color:rgb(225 / 255, 29 / 255, 72 / 255) });
    y -= 20;

    // Draw Trip Description
    drawText(tripData.tripDescription, 50, y, { font, size: 14, color: rgb(0.5, 0.5, 0.5) });
    y -= 30;

    // Draw Time to Read and Budget
    drawText(`Time to Read: ${tripData.timeToRead} min`, 50, y, { size: 12 });
    drawText(`Avg. Budget: ${tripData.averageBudgetPerPerson}`, 300, y, { size: 12 });
    y -= 30;

    // Draw Hotels
    drawText("Hotel Details", 50, y, { size: 16 });
    y -= 20;
    tripData.hotelDetails.forEach((hotel) => {
        drawText(`Hotel: ${hotel.HotelName}`, 50, y);
        drawText(`Address: ${hotel["Hotel address"]}`, 50, y - 15, { font, size: 10 });
        drawText(`Price: ${hotel.Price} | Rating: ${hotel.Rating}`, 50, y - 30, { font, size: 10 });
        drawText(`Description: ${hotel.description}`, 50, y - 45, { font, size: 10 });
        y -= 60;
    });
    y -= 30;

    // Draw Daily Itinerary
    drawText("Daily Itinerary", 50, y, { size: 16 });
    y -= 20;
    tripData.itineraryPlan.forEach((day) => {
        drawText(`Day ${day.day} - ${day.best_time_to_visit}`, 50, y, { size: 14 });
        y -= 20;

        day.places.forEach((place) => {
            drawText(`Place: ${place["Place name"]}`, 60, y, { size: 12 });
            drawText(`Ticket: ${place["ticket pricing"]} | Rating: ${place.rating}`, 60, y - 15, { size: 10 });
            drawText(`Travel Time: ${place["time travel"]}`, 60, y - 30, { size: 10 });
            y -= 50;
        });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and download the file
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${tripData.tripName}.pdf`;
    link.click();
}
