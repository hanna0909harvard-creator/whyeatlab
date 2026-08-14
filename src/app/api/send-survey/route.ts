import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CATEGORIES, type CategoryId, getCategory } from "@/lib/introCategories";

type SendSurveyBody = {
  name: string;
  email: string;
  message: string;
  selectedCategories: CategoryId[];
  answers: Record<string, string>;
};

function isCategoryId(value: unknown): value is CategoryId {
  return (
    typeof value === "string" &&
    CATEGORIES.some((category) => category.id === value)
  );
}

function formatSurveyBody(body: SendSurveyBody): string {
  const sections = body.selectedCategories
    .filter(isCategoryId)
    .map((categoryId) => {
      const category = getCategory(categoryId);
      if (!category) return "";

      const questionLines = category.questions
        .map((question, index) => {
          const answer = body.answers[`${categoryId}-${index}`];
          if (!answer) return "";
          return `  Q${index + 1}: ${question.text}\n  A: ${answer}`;
        })
        .filter(Boolean)
        .join("\n\n");

      return `${category.label}\n${questionLines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    "",
    "Message:",
    body.message || "(none)",
    "",
    "Selected categories & answers:",
    "",
    sections || "(none)",
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: SendSurveyBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "whyeatlab@gmail.com",
      replyTo: body.email,
      subject: "New Why Eat Survey Result",
      text: formatSurveyBody(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send survey email:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
