import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";

const UserQueryDetail = () => {
    const context = useContext(myContext);
    const { loading, getUserQuery } = context;

    const user = JSON.parse(localStorage.getItem("user"));

    const filterData = getUserQuery.filter((obj) => obj.userId.includes(user?.uid))

    // console.log(filterData)
    

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-indigo-300 font-bold">All User Query</h1>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

               {filterData.length > 0 ?
                <table className="w-full text-left border border-collapse sm:border-separate border-indigo-100 text-indigo-400" >

                <tbody>
                    <tr>
                        <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                        <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100 font-bold fontPara">Name</th>
                        <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Email</th>
                        <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100">Phone Number</th>
                        <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-indigo-100 text-slate-700 bg-slate-100"> Date</th>
                    </tr>
                    {filterData.map((item, index) => {
                        const {  name, email, phoneNumber, date } = item
                        return (
                            <tr key={index} className="text-indigo-300">
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 ">
                                    {index + 1}.
                                </td>

                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                    {name}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                    {email}
                                </td>

                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                    {phoneNumber}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-indigo-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                    {date}
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
             :
             <h1 className="text-center">Not Found</h1>}
            </div>
        </div>
    );
}

export default UserQueryDetail;