import transport from "./mailer.js";

export const welcomeMail = async (name,email) => {
    try {

        const info = await transport.sendMail({
            from: `"FitConnect" <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: `Welcome to FitConnect, ${name}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
                    <h2 style="color:#0d6efd;">Welcome to FitConnect 💪</h2>

                    <p>Hi <strong>${name}</strong>,</p>

                    <p>Thank you for joining <strong>FitConnect</strong>.</p>

                    <p>
                        We're excited to help you achieve your fitness goals.
                        Explore workouts, connect with trainers, and start your fitness journey today!
                    </p>

                    <hr>

                    <p style="font-size:14px;color:#777;">
                        Stay healthy,<br>
                        <strong>Team FitConnect</strong>
                    </p>
                </div>
            `
        });

        return true;
    } catch (err) {
        console.error("Welcome email failed:", err);
        return false;
    }
};