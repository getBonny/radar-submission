import axios from 'axios';

export const sendEmailVerification = async (email: string, DYNAMIC_ENVIRONMENT_ID: string) => {
  try {
    const response = await axios.post(
      `https://app.dynamicauth.com/api/v0/sdk/${DYNAMIC_ENVIRONMENT_ID}/emailVerifications/create`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dyn_LQdWdHVCOJtd34r9o1DBtN5tnmhIyXMbGmOvP8Ud4vQgiki6ZS3b3dTb'
        },
      }
    );
    console.log('Email verification sent successfully:', response.data);
    return response.data.verificationUUID;
  } catch (error) {
    console.error('Error sending email verification:', error);
    throw error;
  }
};

export const verifyEmail = async (OTP: string, UUID: string, DYNAMIC_ENVIRONMENT_ID: string) => {
  try {
    const response = await axios.post(
      `https://app.dynamicauth.com/api/v0/sdk/${DYNAMIC_ENVIRONMENT_ID}/emailVerifications/signIn`,
      {
        verificationToken: OTP,
        verificationUUID: UUID,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dyn_LQdWdHVCOJtd34r9o1DBtN5tnmhIyXMbGmOvP8Ud4vQgiki6ZS3b3dTb'
        },
      }
    );
    console.log('Email verification successful:', response.data);
    return response.data.jwt;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};
