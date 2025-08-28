import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import { ResumeData } from "@/types";

export async function renderResumeToPdf(
    htmlTemplate: string,
    data: ResumeData
): Promise<Uint8Array> {
    try {
        const template = Handlebars.compile(htmlTemplate);
        const html = template(data);

        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "8mm",
                bottom: "8mm",
                left: "8mm",
                right: "8mm",
            },
        });

        await browser.close();
        return pdf;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new Error("Failed to generate PDF");
    }
}

export async function renderCoverLetterToPdf(
    htmlTemplate: string,
    variables: Record<string, unknown>
): Promise<Uint8Array> {
    try {
        const template = Handlebars.compile(htmlTemplate);
        const html = template(variables);

        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "20mm",
                right: "20mm",
            },
        });

        await browser.close();
        return pdf;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new Error("Failed to generate PDF");
    }
}
