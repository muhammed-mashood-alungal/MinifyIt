import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { AuthServices } from "../Services/auth.services";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";

const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .regex(/^(?!\s*$).+/, "Name cannot be empty or spaces only"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const validation = signupSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors: typeof errors = {};
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof errors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      await AuthServices.signUp(formData);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something Went While SignUp");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-gray-400">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            className="pl-10 pr-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.password}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="••••••••"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded"
      >
        Create account
      </button>
    </form>
  );
}

export default SignupForm;
