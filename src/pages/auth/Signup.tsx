import InputField from "../../components/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { PuffLoader } from "react-spinners";
import { registrationSchema } from "../../services/Validations/SignUpSchema";
import { singupApi } from "../../services/api/userApi";
import {message} from 'antd'


export const Signup = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit:async (values) => {
      
      try{
     const responce = await singupApi(values)
     if(responce){
      console.log(responce)
        if(responce.data){
          localStorage.setItem('UserToken', JSON.stringify(responce.data));
          message.success('logged in successfully.');
          navigate('/');
        }else{
          message.error("Network error")
        }
     }
      }catch(err:any){
        message.error(err.response.data.error)
      }  
    },
  });

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:border dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Let's Get Started!
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <InputField
                  labelText="User Name"
                  inputType="text"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeHolder="David john"
                  isMessage={true}
                  messageType="error"
                  message={formik.errors.userName}
                />
                <InputField
                  labelText="Your email"
                  inputType="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeHolder="name@company.com"
                  isMessage={true}
                  messageType="error"
                  message={formik.errors.email}
                />
                <InputField
                  labelText="Password"
                  inputType="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeHolder="••••••••"
                  isMessage={true}
                  messageType="error"
                  message={formik.errors.password}
                />
                <button
                  type="submit"
                  className="bg-[#4f46e5] hover:bg-[#6f69f0] text-white font-semibold py-2 px-4 rounded-full shadow-md w-full"
                >
                  {formik.isSubmitting ? (
                    <>
                      <PuffLoader  color="white" size={20} />
                    </>
                  ) : (
                    "Sign up"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                  >
                    LOGIN
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 