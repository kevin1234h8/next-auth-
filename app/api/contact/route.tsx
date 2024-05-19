import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const transporter = nodemailer.createTransport({
      host: "mail.pro36.web.id",
      port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const toHostMailData = {
      from: body.email,
      to: "kevin@pro36.web.id",
      subject: `Hello ${body.name}`,
      text: `${body.message} send from ${body.email}`,
      html: `
      <p> [Name] </p>
      <p> ${body.name} </p>
      <p> [email] </p>
      <p> ${body.email} </p>
      <p> [message] </p>
      <p> ${body.message} </p>`,
    };

    transporter.sendMail(toHostMailData, (err, info) => {
      if (err) return err;
      console.log(info);
    });

    return NextResponse.json(
      { message: "email send successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "email send failed" }, { status: 500 });
  }
};
