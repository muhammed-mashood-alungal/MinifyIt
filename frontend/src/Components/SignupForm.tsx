import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { AuthServices } from "../Services/auth.services";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Signup submitted", formData);
    const response = await AuthServices.signUp(formData);
    console.log(response);
    navigate('/verify-otp',{state:{email:formData.email}})
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
            required
            placeholder="John Doe"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.username}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
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
      </div>

      <div>
        <label className="block text-sm text-gray-400">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            required
            placeholder="••••••••"
            className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        </div>
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
