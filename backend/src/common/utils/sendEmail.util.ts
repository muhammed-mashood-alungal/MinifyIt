import transporter from "src/modules/configs/mail.config";

export const sendOtp = async (email: string, otp: string) => {
  try {
    const options = {
      from: '',
      to: email,
      subject: 'Minify OTP Verificaiton',
      html: `
                <h1>OTP Verification</h1>
                <p>Your OTP is: ${otp}</p>
                <p>Use this OTP to verify your email. Do not share it with anyone.</p><br />
                <p>If you did not request this verification, you can ignore this email.</p>
                <p>--- Minify</p>
                  `,
    };
    await transporter.sendMail(options);
  } catch (error) {
    throw new Error('Error Sending otp email');
  }
};
