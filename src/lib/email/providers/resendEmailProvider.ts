import { Resend } from "resend";
import type { EmailProvider } from "../emailProvider";
import { RESEND_API_KEY } from "@/lib/core/env";

const resend = new Resend(RESEND_API_KEY!);

export const resendEmailProvider: EmailProvider = {
  async sendPasswordReset(to, resetLink) {
    const { error } = await resend.emails.send({
      from: "Authentication App <noreply@next-js-boilerplate.com>",
      to,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click here to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    if (error) {
      console.error("Failed to send password reset email via Resend", error);
      throw error;
    }
  },
};
