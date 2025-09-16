import Mail from "../model/email.model.js";
import { transporter } from "../config/mailer.js";

export async function getAllMail(req, res) {
  try {
    const emails = await Mail.find();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: "Failed to get mails", error });
  }
}

export async function getMail(req, res) {
  try {
    const email = await Mail.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ message: "Mail not found" });
    }
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: "Error Getting mail " });
  }
}

export async function sendMail(req, res) {
  try {
    const newMail = new Mail(req.body);
    await newMail.save();

    await transporter.sendMail({
      from: newMail.email,
      to: process.env.PERSONAL_EMAIL,
      subject: `Portfolio Contact: ${newMail.subject}`,
      text: `New contact form submission from your portfolio:

Name: ${newMail.name}
Email: ${newMail.email}
Subject: ${newMail.subject}

Message:
${newMail.message}

---
This message was sent from your portfolio contact form.`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Portfolio Contact
        </h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${newMail.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${newMail.email}" style="color: #007bff;">${newMail.email}</a></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; white-space: pre-wrap;">
${newMail.message}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          This message was sent from your portfolio contact form.
        </div>
      </div>
    </div>
  `,
    });
    console.log("Mail sent successfully");
    res.status(201).json(newMail);
  } catch (error) {
      console.error(error)
    res.status(500).json({ message: "Error sending mail" });
  }
}

export async function readMail(req, res) {
  try {
    const { id } = req.params;
    const updated = await Mail.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Mail not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error marking mail as read:", error);
    res.status(500).json({ message: "Server error" });
  }
}
