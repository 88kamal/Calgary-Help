import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const RoomDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllRoom, getAllRoomFunction } = context;

    const user = JSON.parse(localStorage.getItem("user"));

    const filterData = getAllRoom.filter((obj) => obj.userId === user?.user?.uid)

    // navigate 
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'room', id))
            toast.success('Room Deleted successfully')
            getAllRoomFunction();
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
                <h1 className=" text-xl text-indigo-300 font-bold">All Room</h1>
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
                                    <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Title</th>
                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Price</th>
                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100"> Date</th>
                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Action</th>
                                    <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Action</th>
                                </tr>
                                {filterData.map((item, index) => {
                                    const { id, name, price, date, image1 } = item
                                    return (
                                        <tr key={index} className="text-indigo-300">
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 ">
                                                {index + 1}.
                                            </td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                <div className="flex justify-center py-2">
                                                    <img className="w-20 rounded-md " src={image1} alt="" />
                                                </div>
                                            </td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {name}
                                            </td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                ₹{price}
                                            </td>

                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {date}
                                            </td>
                                            <td onClick={() => navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                                Edit
                                            </td>
                                            <td onClick={() => deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
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

export default RoomDetail;