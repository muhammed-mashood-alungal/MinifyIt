import { Mail } from "lucide-react";
import {
    use,
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { AuthServices } from "../Services/auth.services";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const location = useLocation()
  const navigate = useNavigate()
  const email  = location?.state?.email

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  useEffect(()=>{
    if(!email){
        navigate('/signup')
    }
  },[])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return;
    if (value.length > 6) return;
    setOtp(value);
  };

  const handleSubmit = async(e: SyntheticEvent) => {
    try {
        e.preventDefault();
        await  AuthServices.verifyOtp(email , otp)
        navigate('/login')
    } catch (error) {
        toast.error("Something Went Wrong")
    }
  };

  const resendOtp = () => {};
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-400">Your OTP </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            <input
              type="text"
              name="otp"
              required
              className="pl-10 py-3 w-full rounded bg-gray-900 border border-gray-700 text-gray-300"
              onChange={handleInputChange}
              value={otp}
            />
          </div>
        </div>
        {
            timer > 0 &&  <span className=" flex justify-center text-white">00:{timer}</span>
        }
        {timer > 0 ? (
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded"
          >
            Verify
          </button>
        ) : (
          <button
            onClick={resendOtp}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded"
          >
            Resend
          </button>
        )}
      </form>
    </>
  );
}

export default VerifyOtp;
