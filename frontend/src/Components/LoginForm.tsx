import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { AuthServices } from "../Services/auth.services";
import { useAuth } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { checkAuth } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const validation = loginSchema.safeParse(formData)
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      validation.error.errors.forEach(err => {
        const field = err.path[0] as keyof typeof fieldErrors
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    try {
      await AuthServices.signIn(formData)
      checkAuth()
      navigate('/')
    } catch (error: unknown) {
        console.log('HEY ERROR IN SIGNIN')
      toast.error((error as Error).message || "Something Went Login")
    }
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-400">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            <input
              type={showPassword ? 'text' : 'password'}
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
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded">
          Sign in
        </button>
      </form>
    </>
  );
}

export default LoginForm;
