import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

export default function CreateJob() {
    const context = useContext(myContext);
    const { mode, setLoading, loading } = context;

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const [addJobDetail, setAddJobDetail] = useState({
        title: "",
        salary: "",
        jobSite: "",
        description: "",
        userId: user?.uid,
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        ),
        time: Timestamp.now(),
    });


    const handleAddJobDetail = async () => {
        try {
            const jobRef = collection(fireDB, 'job');
            await addDoc(jobRef, addJobDetail)
            toast.success("Job Add Successfully");
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Create Room failed");
        }

    }

    return (
        <>
            <div className=" flex justify-center items-center h-screen">
                {loading && <div>
                    <Loader />
                </div>}
                <Card color="transparent" className=" p-5 shadow-md border border-gray-300 bg-gray-100" shadow={true} style={{ background: mode === 'dark' ? 'rgb(31, 41, 55)' : '' }}>
                    <Typography variant="h4" color="" style={{ color: mode === 'dark' ? 'white' : 'black' }} >
                        <div className="flex items-center gap-2">
                            <Link to={'/dashboard'}>
                                <BsFillArrowLeftCircleFill />
                            </Link>  Add Job
                        </div>
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">

                            <Input size="lg" label="Job Title" name="title"
                                onChange={(e) => setAddJobDetail({
                                    ...addJobDetail,
                                    title: e.target.value
                                })}
                                value={addJobDetail.title}
                            />


                            <Input size="lg" label="Salary" type="number" name="salary"
                                onChange={(e) => setAddJobDetail({
                                    ...addJobDetail,
                                    salary: e.target.value
                                })}
                                value={addJobDetail.salary}
                            />
                            

                            <Input size="lg" label="Job Site" name="jobSite"
                                onChange={(e) => setAddJobDetail({ ...addJobDetail, jobSite: e.target.value })}
                                value={addJobDetail.jobSite}
                            />

                            <Textarea size="lg" label="Description" name="description"
                                onChange={(e) => setAddJobDetail({
                                    ...addJobDetail,
                                    description: e.target.value
                                })}
                                value={addJobDetail.description}
                            />

                        </div>
                        <Button onClick={handleAddJobDetail} style={{
                                background: mode === 'dark' ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }} className="mt-6 " fullWidth>
                            Add Job
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}