import React, { useContext, useReducer, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import InputText from '../../Components/InputText/InputText'
import AuthContext from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
// signIn
const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload };
        case "SET_LASTNAME":
            return { ...state, lastName: action.payload };
        case "SET_PHONENUMBER":
            return { ...state, phoneNumber: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_CONFIRMPASSWORD":
            return { ...state, confirmPassword: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "CLEAR_ERROR":
            return { ...state, error: "" };
        default:
            return state;
    }
};

// signIn
const initialState = {
    name: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    error: ""
};

// login
const formReducerLogin = (state, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, userName: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "CLEAR_ERROR":
            return { ...state, error: "" };
        default:
            return state;
    }
};

// login
const initialStateLogin = {
    userName: "",
    password: "",
    error: ""
};

export default function Register() {
    const [page, setPage] = useState("login")


    const { signIn, error, login } = useContext(AuthContext)
    // signIn
    const [state, dispatch] = useReducer(formReducer, initialState);

    // login
    const [stateLogin, dispatchLogin] = useReducer(formReducerLogin, initialStateLogin);

    const handleSubmit = (event) => {
        event.preventDefault();

        // اعتبارسنجی ساده برای ایمیل و رمز عبور
        if (!state.password || !state.confirmPassword) {
            dispatch({ type: "SET_ERROR", payload: " رمز عبور الزامی است" });
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "رمز عبور الزامی است",
            });
            return;
        } else if (state.password !== state.confirmPassword) {
            dispatch({ type: "SET_ERROR", payload: " رمز عبور با تاییذ رمز عبور مطابقت ندارد" });
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "رمز عبور با تایید رمز عبور مطابقت ندارد",
            });
            return;
        } else if (state.password.length < 8 || state.confirmPassword.length < 8) {
            dispatch({ type: "SET_ERROR", payload: " رمز عبور باید حداقل هشت کاراکتر باشد " });
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "رمز عبور باید حداقل هشت کاراکتر باشد",
            });
            return;
        } else if (state.phoneNumber.length !== 11 || !state.phoneNumber.startsWith("09")) {
            dispatch({ type: "SET_ERROR", payload: "فرمت شماره صحیح نیست" });
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "فرمت شماره صحیح نیست",
            });
            return;
        }
        dispatch({ type: "CLEAR_ERROR" });
        console.log("اطلاعات فرم:", state);

        signIn(state);
    };
    const handleLogin = (event) => {
        event.preventDefault();

        // if (!state.password || !state.confirmPassword) {
        //     dispatchLogin({ type: "SET_ERROR", payload: " رمز عبور الزامی است" });
        //     alert("error")
        //     return;
        // } else if (state.password !== state.confirmPassword) {
        //     dispatchLogin({ type: "SET_ERROR", payload: " رمز عبور با تاییذ رمز عبور مطابقت ندارد" });
        //     alert("error")
        //     return;
        // }

        dispatchLogin({ type: "CLEAR_ERROR" });
        console.log("اطلاعات فرم:", stateLogin);
        login(stateLogin)
    }
    return (
        <div className='w-full h-screen font-Dana bg-white '>
            {/* <Navbar /> */}
            <div className='w-full h-screen flex justify-center items-center'>
                {
                    page === "login" ? (
                        <div className='border-2 border-corn-flower w-full sm:w-auto mx-4 rounded-2xl p-4 sm:p-10 sm:pb-12'>
                            {/* title */}
                            <div className='w-full text-center text-2xl pb-10 font-MorabbaMedium'>
                                ثبت نام
                            </div>
                            <div className='grid grid-cols-12 justify-between gap-5'>
                                <InputText id='1' className='col-span-6' title="اسم"
                                    setFunc={(e) => dispatch({ type: "SET_NAME", payload: e })}
                                    value={state.name} />
                                <InputText  id='2' className='col-span-6' title="نام خانوادگی"
                                    setFunc={(e) => dispatch({ type: "SET_LASTNAME", payload: e })}
                                    value={state.lastName} />
                                <InputText dir='ltr' justEnglish={true} id='3' className='col-span-6' title="رمز"
                                    setFunc={(e) => dispatch({ type: "SET_PASSWORD", payload: e })}
                                    value={state.password} />
                                <InputText dir='ltr' justEnglish={true} id='4' className='col-span-6' title="تایید رمز"
                                    setFunc={(e) => dispatch({ type: "SET_CONFIRMPASSWORD", payload: e })}
                                    value={state.confirmPassword} />
                                <InputText dir='ltr' justEnglish={true} id='5' className='col-span-12' title="شماره تماس"
                                    setFunc={(e) => dispatch({ type: "SET_PHONENUMBER", payload: e })}
                                    value={state.phoneNumber} />
                                <div className='col-span-12 flex flex-col'>
                                    <button onClick={(event) => handleSubmit(event)} className='w-full btn'>
                                        ثبت نام
                                    </button>
                                    <div className='w-full flex justify-start items-center gap-1 pt-2'>
                                        <span>
                                            حساب کاربری دارید ؟
                                        </span>
                                        <span onClick={() => setPage("signIn")} className='text-corn-flower cursor-pointer'>
                                            ورود
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='border-2 border-corn-flower rounded-2xl mx-0 px-5 sm:px-10 p-4 pb-12'>
                            {/* title */}
                            <div className='w-full text-center text-2xl pb-10 font-MorabbaMedium'>
                                ورود
                            </div>
                            <div className='grid grid-cols-12 justify-between gap-5 min-w-72'>
                                <InputText dir='ltr' justEnglish={true} id="1" className='col-span-12' title="شماره تماس"
                                    setFunc={(e) => dispatchLogin({ type: "SET_USERNAME", payload: e })}
                                    value={stateLogin.userName} />
                                <InputText dir='ltr' justEnglish={true} id="2" className='col-span-12' title="رمز"
                                    setFunc={(e) => dispatchLogin({ type: "SET_PASSWORD", payload: e })}
                                    value={stateLogin.password} />
                                <div className='col-span-12 flex flex-col'>
                                    <button onClick={(event) => handleLogin(event)} className='w-full btn'>
                                        ورود
                                    </button>
                                    <div className='w-full flex justify-start items-center gap-1 pt-2'>
                                        <span>
                                            حساب کاربری ندارید ؟
                                        </span>
                                        <span onClick={() => setPage("login")} className='text-corn-flower cursor-pointer'>
                                            ثبت نام
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
