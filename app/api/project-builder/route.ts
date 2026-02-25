import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      industry,
      projectType,
      budget,
      name,
      email,
      selectedServices,
      totalPrice,
    } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    if (!industry || !projectType || !budget) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const submission = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      industry,
      projectType,
      budget,
      selectedServices: selectedServices || [],
      totalPrice: totalPrice || 0,
      personalizedMessage: `Hi ${name.trim()}, thank you for choosing Nexora Digital! We're excited about your ${projectType.toLowerCase()} project in the ${industry.toLowerCase()} space. Based on your selections, we estimate a project cost of $${(totalPrice || 0).toLocaleString()}. Our team will review your requirements and reach out within 24 hours to discuss the next steps.`,
    };

    await prisma.submission.create({ data: submission });

    // ✉️ Send confirmation email
    const emailresult = await resend.emails.send({
      from: "Nexora Digital <onboarding@resend.dev>",
      to: email,
      subject: "We received your project request 🚀",
      html: `
        <h2>Hi ${submission.name},</h2>
        <p>${submission.personalizedMessage}</p>

        <p><strong>Estimated Budget:</strong> $${submission.totalPrice.toLocaleString()}</p>

        <p>
          📅 <a href="https://calendly.com/nexora-digital">
          Schedule a free call
          </a>
        </p>

        <p>— Nexora Digital Team</p>
      `,
    });

    console.log(emailresult);

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      personalizedMessage: submission.personalizedMessage,
    });
  } catch (error) {
    console.error("Project builder error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}



export async function GET() {
  const getProjectbuilder = await prisma.submission.findMany();
  return NextResponse.json(getProjectbuilder);
}


// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const {
//       industry,
//       projectType,
//       budget,
//       name,
//       email,
//       selectedServices,
//       totalPrice,
//     } = body;

//     // Backend validation
//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       return NextResponse.json({ error: "Name is required" }, { status: 400 });
//     }
//     if (
//       !email ||
//       typeof email !== "string" ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//     ) {
//       return NextResponse.json(
//         { error: "Valid email is required" },
//         { status: 400 },
//       );
//     }
//     if (!industry || !projectType || !budget) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 },
//       );
//     }

//     // Build submission record
//     const submission = {
//       id: crypto.randomUUID(),
//       name: name.trim(),
//       email: email.trim(),
//       industry,
//       projectType,
//       budget,
//       selectedServices: selectedServices || [],
//       totalPrice: totalPrice || 0,
//       personalizedMessage: `Hi ${name.trim()}, thank you for choosing Nexora Digital! We're excited about your ${projectType.toLowerCase()} project in the ${industry.toLowerCase()} space. Based on your selections, we estimate a project cost of $${(totalPrice || 0).toLocaleString()}. Our team will review your requirements and reach out within 24 hours to discuss the next steps.`,
//     };

//     const projectAdd = await prisma.submission.create({
//       data: submission,
//     });

//     if (!projectAdd) {
//       console.log("not added");
//     }

//     console.log("[v0] Email would be sent to:", email);
//     console.log("[v0] Personalized message:", submission.personalizedMessage);
//     console.log(
//       "[v0] Call scheduling link: https://calendly.com/nexora-digital",
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Submission received successfully",
//       personalizedMessage: submission.personalizedMessage,
//     });
//   } catch (error) {
//     console.error("[v0] Project builder error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// export async function GET() {
//   const getProjectbuilder = await prisma.submission.findMany();
//   return NextResponse.json(getProjectbuilder);
// }
