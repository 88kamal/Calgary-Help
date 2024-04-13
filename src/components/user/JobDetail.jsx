import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const JobDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllJob, getAllJobFunction } = context;

    const user = JSON.parse(localStorage.getItem("user"));

    const filterData = getAllJob.filter((obj) => obj.userId === user?.uid)


    // Delete Job 
    const deleteJob = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'job', id))
            toast.success('Job Deleted successfully')
            getAllJobFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-indigo-300 font-bold">All Job</h1>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                {filterData.length > 0 ?
                    <>
                        <table className="w-full text-left border border-collapse sm:border-separate border-indigo-100 text-indigo-400" >

                            <tbody>
                                <tr>
                                    <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>

                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Title</th>

                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Salary</th>

                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Job Site</th>

                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100"> Date</th>

                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Action</th>
                                </tr>
                                {filterData.map((item, index) => {
                                    const { id, title, salary, date, jobSite } = item
                                    return (
                                        <tr key={index} className="text-indigo-300">
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 ">
                                                {index + 1}.
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {title}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                ₹{salary}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500  ">
                                                <a href={jobSite} target="_blank" className=" hover:underline">
                                                    {jobSite}
                                                </a>
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {date}
                                            </td>
                                            
                                            <td onClick={() => deleteJob(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                                Delete
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </> :

                    <h1 className=" text-center">Not Found</h1>}
            </div>
        </div>
    );
}

export default JobDetail;