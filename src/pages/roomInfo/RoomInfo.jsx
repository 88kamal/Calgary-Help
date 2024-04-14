import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { RoomImageCarousel } from "./RoomImageCarousel";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Layout from "../../components/layout/Layout";
import { ContactModal } from "./ContactModal";
import toast from "react-hot-toast";

const RoomInfo = () => {
    const context = useContext(myContext);
    const { mode, setLoading } = context;

    const { id, userId } = useParams()

    // const navigate = useNavigate();

    const [room, setRoom] = useState("");

    console.log(room)

    const getRoomData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "room", id))
            // console.log({...productTemp.data(), id : productTemp.id})
            setRoom({ ...productTemp.data(), id: productTemp.id })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getRoomData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, userId]);


    const user = JSON.parse(localStorage.getItem("user"));

    const [userDetail, setUserDetail] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        userId: userId,
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

    const handleSendDetail = async () => {
        // console.log({
        //     name: userDetail.name,
        //     email: userDetail.email,
        //     phoneNumber: userDetail.phoneNumber,
        //     userId: userDetail.userId,

        // })
        if (userDetail.name == "" || userDetail.email == "" || userDetail.phoneNumber == "") {
            return toast.error("All Fields are required")

        }
        setLoading(true);
        try {
            const roomRef = collection(fireDB, 'contact');
            await addDoc(roomRef, userDetail)
            toast.success("Data Send Successfully");
            setLoading(false)
            setUserDetail({
                name: "",
                email: "",
                phoneNumber: ""
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add product failed");
        }
    }


    return (
        <Layout>
            <section className="body-font px-5 py-[20px] mx-auto">
                <div className=" mb-3 ">
                    <RoomImageCarousel roomDetail={room?.image} />
                </div>

                <div className="">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className={`fontPara text-2xl lg:text-3xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>{room?.name}</h2>

                        {/* Social Media Icons  */}
                        <div className="flex items-center gap-2 cursor-pointer">
                            {/* Whatsapp Icon  */}
                            <BsWhatsapp size={24} className={`${mode === 'dark' ? 'text-[#25d366]' : 'text-[#075e54]'}`} />

                            {/* Facebook Icon  */}
                            <FaFacebook size={24} color="#316FF6" />

                            {/* Instagram Icon  */}
                            <RiInstagramFill size={24} color="#cd486b" />
                        </div>
                    </div>

                    <table className={`w-full text-left border border-collapse sm:border-separate ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} ${mode === 'dark' ? 'text-white' : 'text-black'} fontPara`} >
                        <tbody>
                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-banknote"
                                        >
                                            <rect width={20} height={12} x={2} y={6} rx={2} />
                                            <circle cx={12} cy={12} r={2} />
                                            <path d="M6 12h.01M18 12h.01" />
                                        </svg>
                                        <span>Room Price</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    ₹ {room?.price}/month
                                </td>


                            </tr>



                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-map-pin"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx={12} cy={10} r={3} />
                                        </svg>
                                        <span>Location</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.address}
                                </td>


                            </tr>

                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-bed"
                                        >
                                            <path d="M2 4v16" />
                                            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                                            <path d="M2 17h20" />
                                            <path d="M6 8v9" />
                                        </svg>
                                        <span>Beds</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.bedrooms}
                                </td>


                            </tr>

                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-bath"
                                        >
                                            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                                            <line x1={10} x2={8} y1={5} y2={7} />
                                            <line x1={2} x2={22} y1={12} y2={12} />
                                            <line x1={7} x2={7} y1={19} y2={21} />
                                            <line x1={17} x2={17} y1={19} y2={21} />
                                        </svg>

                                        <span>BathRooms</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.bathrooms}
                                </td>
                            </tr>


                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-armchair"
                                        >
                                            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                                            <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                                            <path d="M5 18v2" />
                                            <path d="M19 18v2" />
                                        </svg>


                                        <span>Furnished</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.furnished}
                                </td>
                            </tr>


                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-square-parking"
                                        >
                                            <rect width={18} height={18} x={3} y={3} rx={2} />
                                            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                                        </svg>

                                        <span>Parking</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-b border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.parking}
                                </td>
                            </tr>


                            <tr className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>

                                <td className={`h-12 px-6 text-md transition duration-300 border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-list"
                                        >
                                            <line x1={8} x2={21} y1={6} y2={6} />
                                            <line x1={8} x2={21} y1={12} y2={12} />
                                            <line x1={8} x2={21} y1={18} y2={18} />
                                            <line x1={3} x2="3.01" y1={6} y2={6} />
                                            <line x1={3} x2="3.01" y1={12} y2={12} />
                                            <line x1={3} x2="3.01" y1={18} y2={18} />
                                        </svg>

                                        <span>Type Of Listing</span>
                                    </div>
                                </td>
                                <td className={`h-12 px-6 text-md transition duration-300 border-l first:border-l-0 ${mode === 'dark' ? 'border-[#5f63b8]' : 'border-[#5f63b8]'} stroke-slate-500 text-slate-500 first-letter:uppercase`}>
                                    {room?.type}
                                </td>
                            </tr>








                        </tbody>
                    </table>


                    <ContactModal userDetail={userDetail} setUserDetail={setUserDetail} handleSendDetail={handleSendDetail} />

                </div>
            </section>
        </Layout>

    );
}

export default RoomInfo;
