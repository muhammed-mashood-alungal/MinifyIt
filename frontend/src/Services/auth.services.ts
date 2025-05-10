import { authInstance } from "../Axios/createInstances";

export const AuthServices = {
  signUp: async (formData: any) => {
    try {
      console.log(formData);
      const response = await authInstance.post("/signup", formData);
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  signIn: async (formData: any) => {
    try {
      const response = await authInstance.post("/signin", formData);
      console.log(response);
      localStorage.setItem("minify_token", response?.data?.token);
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  resendOtp: async (email: any) => {
    try {
      const response = await authInstance.post("/resend-otp", { email });
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await authInstance.post("/verify-otp", { email, otp });
      return response;
    } catch (error: any) {
     throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  authMe: async (): Promise<{ id: string; email: string } | undefined> => {
    try {
      const token = localStorage.getItem("minify_token");
      const response = await authInstance.post(
        "/me",
        {},
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error : any) {
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
};
