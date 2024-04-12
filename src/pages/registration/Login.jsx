/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import toast from 'react-hot-toast';
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

export default function Login() {
    const context = useContext(myContext);
    const { mode, loading } = context;

    // creating navigate 
    const navigate = useNavigate();

    // Email State 
    const [email, setEmail] = useState('');

    // Password State 
    const [password, setPassword] = useState('');

    /**========================================================================
     *                              Signin Function 
     *========================================================================**/
    const signIn = async () => {
        try {
            // Signin with email and password
            const result = await signInWithEmailAndPassword(auth, email, password);

            // Toast success message 
            toast.success('Login Success')

            // store user detail in localStorage 
            localStorage.setItem('user', JSON.stringify(result));

            // navigate "/profile"
            navigate('/dashboard');
        } catch (error) {
            console.log(error)
            // Toast error message 
            toast.error('Login Failed')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen  ">
            {loading && <Loader/>}
            {/* Card  */}
            <Card className="w-full max-w-[24rem]"
                style={{
                    background: mode === 'dark' ? 'rgb(30, 41, 59)'
                        : 'rgb(226, 232, 240)'
                }}>

                {/* Card header  */}
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: mode === 'dark' ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)'
                    }}
                >
                    {/* Image  */}
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">
                            {/* img  */}
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20" />
                        </div>
                    </div>

                    {/* Login text  */}
                    <Typography
                        variant="h4"
                        style={{
                            color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                : 'rgb(226, 232, 240)'
                        }}>
                        Login
                    </Typography>
                </CardHeader>

                {/* Card Body  */}
                <CardBody>
                    {/* Form  */}
                    <form className=" flex flex-col gap-4">

                        {/* Email input  */}
                        <div>
                            <Input type="email" label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input  */}
                        <div>
                            <Input type="password" label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login Button  */}
                        <Button
                            onClick={signIn}
                            style={{
                                background: mode === 'dark' ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }}>
                            Login
                        </Button>

                        {/* text  */}
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center justify-center gap-1 font-normal opacity-60"
                        >
                            Don't Have an account

                            {/* link  */}
                            <Link to={'/signup'} className=" font-bold"
                                style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}
                            >
                                signup
                            </Link>
                        </Typography>
                    </form>
                </CardBody>
            </Card>
        </div>


    );
}