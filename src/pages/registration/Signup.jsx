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
import myContext from "../../context/myContext";
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB, storage } from "../../firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";


export default function Signup() {
    const context = useContext(myContext);
    const { mode, loading, setLoading } = context;

    const navigate = useNavigate();


    // Name State 
    const [name, setName] = useState('');

    // Email State 
    const [email, setEmail] = useState('');

    // Password State 
    const [password, setPassword] = useState('');

    // Image State 
    const [image, setImage] = useState(null);

    /**========================================================================
    *                           Signup Functions
    *========================================================================**/
    const signup = async () => {

        console.log({
            name,
            email,
            password
        })

        // Validation
        if (name === "" || email === "" || password === "" || image === null) {
            return toast.error("All required fields")
        }

        console.log("first")

        setLoading(true)
        try {
            // Create user with email And Password Function
            const users = await createUserWithEmailAndPassword(auth, email, password)

            // creating user object
            var user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email
            }

            // Passing parameter in writeUserData
            writeUserData(user, users)

            setLoading(false)
            navigate('/login')

            // After Submit Form then 

            // SetName Empty
            setName("")

            // setEmail Empty
            setEmail("")

            // setPassword Empty
            setPassword("")

            // setImage Empty
            setImage("")

            // Toast Success Message 
            toast.success('Signup Success')
        } catch (error) {
            console.log(error)
            // Toast Error Message 
            toast.error('Signup Failed')
        }
    }


    /**========================================================================
    *                           WriteUserData Functions
    *========================================================================**/
    const writeUserData = async (user, users) => {
        // validation 
        if (!image) return;

        // Creating Image Reference
        const imageRef = ref(storage, `images/${image.name}`);
        // UploadBytes Function
        uploadBytes(imageRef, image).then((snapshot) => {
            // get DownloadURL 
            getDownloadURL(snapshot.ref).then((url) => {

                // Creating User Refrence
                const userRef = collection(fireDB, "user")

                try {
                    // Add All User Details (user, image, uid) [addDoc Function]
                    addDoc(userRef, {
                        user,
                        image: url,
                        uid: users.user.uid,
                    })
                } catch (error) {
                    console.log(error)

                    // Toast Error Message 
                    toast.error(error)
                }
            });
        });
    }



    return (
        <div className="flex justify-center items-center h-screen  ">
            {loading && <Loader />}
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
                        background: mode === 'dark' ?
                            'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                    }}
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">

                            {/* Custom File Upload  */}
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {image ?
                                    <>
                                        <img
                                            className=" w-20 border-2 rounded-full"
                                            src={image ? URL.createObjectURL(image) : ""}
                                            alt="img"
                                        />
                                    </>
                                    :
                                    <>
                                        <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" className="h-20 w-20" />
                                    </>
                                }
                            </label>

                            {/* Input  */}
                            <input
                                id="file-upload"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>

                    {/* Signup  */}
                    <Typography
                        variant="h4"
                        style={{
                            color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                : 'rgb(226, 232, 240)'
                        }}
                    >
                        Signup
                    </Typography>
                </CardHeader>

                {/* Card Body  */}
                <CardBody>
                    <form className=" flex flex-col gap-4">

                        {/* Name Input  */}
                        <div>
                            <Input type="text" label="Full Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        {/* Email Input  */}
                        <div>
                            <Input type="email" label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* Password Input  */}
                        <div>
                            <Input type="password" label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/* Signup Button  */}
                        <Button
                            onClick={signup}
                            style={{
                                background: mode === 'dark' ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }}>
                            Signup
                        </Button>

                        {/* text  */}
                        <Typography
                            color="gray"
                            className="flex items-center justify-center gap-1 font-normal"
                        >
                            Have an account

                            {/* link  */}
                            <Link to={'/login'}
                                className=" font-bold"
                                style={{ color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)' }}
                            >login</Link>
                        </Typography>
                    </form>
                </CardBody>
            </Card>
        </div>


    );
}