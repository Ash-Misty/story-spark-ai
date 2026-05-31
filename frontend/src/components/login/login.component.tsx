import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/logoNew.png";
import SSInput from "../ui-component/ss-input/ss-input";
import SSButton from "../ui-component/ss-button/ss-button";
import RedirectComponent from "../redirect.component";
import { useLoginUserMutation, useGoogleLoginMutation } from "../../redux/apis/auth.api";
import { storeUserInfo, getUserInfo } from "../../services/auth.service";
import { USER_ROLE } from "../../constants/role";
<<<<<<< HEAD
=======
import RedirectComponent from "../redirect.component";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { WandSparkles, BookOpen, UsersRound } from "lucide-react";
>>>>>>> origin/main

type Inputs = {
  email: string;
  password: string;
};

const LoginComponent = () => {
  const [loginUser] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsBusy(true);
    try {
      const res = await loginUser({ ...data }).unwrap();
      if (res.data.accessToken) {
        toast.success("User logged in successfully!");
        storeUserInfo({ accessToken: res.data.accessToken });
        setIsLoggedIn(true);
      }
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    setIsBusy(true);
    try {
      const res = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();
      if (res.data.accessToken) {
        toast.success("User logged in successfully with Google!");
<<<<<<< HEAD
        storeUserInfo({ accessToken: res.data.accessToken });
=======


        storeUserInfo({
          accessToken: res.data.accessToken,
        });


>>>>>>> origin/main
        setIsLoggedIn(true);
      }
    } catch {
      toast.error("Failed to login with Google. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  if (isLoggedIn) {
    const userInfo = getUserInfo();
    const isDashboardUser =
<<<<<<< HEAD
      userInfo?.role === USER_ROLE.ADMIN || userInfo?.role === USER_ROLE.SUPER_ADMIN;

=======
      userInfo?.role === USER_ROLE.ADMIN ||
      userInfo?.role === USER_ROLE.SUPER_ADMIN;
>>>>>>> origin/main
    return (
      <RedirectComponent
        defaultPath={isDashboardUser ? "/dashboard" : "/explore"}
      />
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 relative overflow-hidden text-slate-900 dark:text-slate-100">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Link to="/" className="inline-block shrink-0 transition-transform duration-200 active:scale-95">
            <img 
              src={logo} 
              alt="Story Spark AI" 
              className="h-12 w-auto object-contain brightness-100 dark:brightness-110"
            />
          </Link>
=======



    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden px-4 box-border">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex w-full max-w-md flex-col justify-center py-12 relative z-10 box-border">

        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-sm">
            STORY SPARK AI
          </h2>
>>>>>>> origin/main
        </div>
        <div className="flex justify-center items-center gap-40">

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            
            Turns Ideas into
            <br /> 
            unforgotable stories
            
            </h1>
          <p>AI powered storytelling that helps you
              <br />            
             create connect inspire.</p>

             <div className="flex justify-center items-center gap-6 border border-gray-300 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-gray-400">
              <div>
                <WandSparkles className="text-violet-600"/>
              </div>
              <div>
                <h1 className="font-bold">Smart writing</h1>
                <p>AI that understands your ideas</p>
              </div>
             </div>


             <div className="flex justify-center items-center gap-6 border border-gray-300 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-gray-400">
              <div>
                <BookOpen className="text-violet-600"/>
              </div>
              <div>
                <h1 className="font-bold">Endless Creativity</h1>
                <p>Stories that captivate and inspire</p>
              </div>
             </div>


             <div className="flex justify-center items-center gap-6 border border-gray-300 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-gray-400">
              <div>
                <UsersRound className="text-violet-600"/>
              </div>
              <div>
                <h1 className="font-bold">Built for everyone</h1>
                <p>Writers, Creaters and dreamers</p>
              </div>
             </div>
             <div className="border border-gray-300 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-gray-400">
                Create, edit, and generate engaging multiple story
                <br />
                 variations from a single prompt.
                  <br />                
                 Perfect for writers, creators, and enthusiasts 
                 <br />
                 exploring the future of fiction.
             </div>
        </div>


        <div className="w-full max-w-md bg-slate-50 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 sm:p-10 shadow-2xl overflow-hidden">

        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-950/5 box-border transition-colors duration-300">
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
              Back to Home
            </Link>
          </div>

<<<<<<< HEAD
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-left">
=======
            <button
            onClick={() => window.location.href = "/"}
            className="mb-4 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-2"
            >
            ← Back to Home
          </button>


          <h3 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
>>>>>>> origin/main
            Welcome Back
          </h2>

          <form 
            className="grid grid-cols-1 gap-5 w-full box-border" 
            onSubmit={handleSubmit(onSubmit)}
<<<<<<< HEAD
          >
=======
            >

          {/* Added w-full to the form */}

          <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
>>>>>>> origin/main
            <SSInput
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
              required={true}
              icon="fi fi-rr-envelope"
              register={register}
              validation={{ required: "Email is required" }}
              error={errors.email}
              />

<<<<<<< HEAD
            <div>
              <SSInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required={true}
                icon="fi fi-rr-lock"
                register={register}
                validation={{ required: "Password is required" }}
                error={errors.password}
              />
              <div className="flex justify-end pt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <SSButton text="Sign In" type="submit" isLoading={isBusy} />
            </div>
          </form>

          <div className="relative my-8 w-full box-border">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-medium">
                Or
=======
            <SSInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required={true}
              icon="fi fi-rr-lock"
              register={register}
              validation={{ required: "Password is required" }}
              error={errors.password}
              />

            <div className="flex justify-end -mt-2">
              <a
                href="/forgot-password"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                Forgot Password?
              </a>
            </div>

            <SSButton
              text="Sign In"
              type="submit"
              isLoading={isBusy}
              />

            <SSButton text="Sign In" type="submit" isLoading={isBusy} />
          </form>

          <div className="mt-6 relative w-full">
            <div className="absolute inset-0 flex items-center w-full">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            <div className="relative flex justify-center text-sm w-full">

              <span className="px-4 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                OR
>>>>>>> origin/main
              </span>
            </div>
          </div>

<<<<<<< HEAD
          <div className="flex justify-center w-full box-border">
=======

          <div className="mt-6 flex justify-center list-none w-full">

>>>>>>> origin/main
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              />
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
<<<<<<< HEAD
            <Link
              to="/signup"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign up for free
            </Link>
=======
            <a
              href="/signup"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
              Sign up for free
            </a>
>>>>>>> origin/main
          </p>
        </div>
      </div>

<<<<<<< HEAD
      <Toaster position="top-right" reverseOrder={false} />
=======
      <Toaster
        position="top-right"
        reverseOrder={false}
        />

>>>>>>> origin/main
    </div>
        </div>
  );
};

export default LoginComponent;