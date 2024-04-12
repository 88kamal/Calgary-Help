import { useContext, useEffect, useState } from 'react';
import myContext from '../../context/myContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import RoomDetail from '../../components/user/RoomDetail';
import UserQueryDetail from '../../components/user/UserQueryDetail';

const Dashboard = () => {
    const context = useContext(myContext);
    const { getAllRoom, getUserQuery, getAllUser } = context;

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));


    // eslint-disable-next-line no-unused-vars
    const getRoomId = getAllRoom.filter((obj) => obj.userId === user?.user?.uid)
    console.log(getUserQuery.filter((obj) => obj.roomId).length)
    
    const userId = getAllUser.filter((obj) => obj?.user?.uid === user?.user?.uid)?.reduce((ac, a) => a, 0);




    // console.log(getUserQuery.filter((obj) => obj.roomId === getRoomId.id).length)

    // Get User State 
    const [getUser, setGetuser] = useState([]);


    /**========================================================================
    *                           Get User Data Functions
    *========================================================================**/
    function getUserData() {
        try {

            // Creating query 
            const q = query(
                collection(fireDB, "user"),
            );

            // Creating Data 
            const data = onSnapshot(q, (QuerySnapshot) => {

                // Creating userArray
                let userArray = [];

                // push all user Data in userArray variable  
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });

                // store user data through setGetuser() 
                setGetuser(userArray)
            });

            // Return Data 
            return () => data;
        } catch (error) {

            // console Error 
            console.log(error)
        }
    }


    const logout = () => {
        localStorage.clear('user');
        navigate('/login')
    }

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <div>
            {/* Top */}
            <div className="top mb-5 px-5 mt-5">
                <div className=" bg-indigo-50 py-5 border border-indigo-100 rounded-lg">
                    <h1 className=" text-center text-2xl font-bold text-indigo-500">Dashboard</h1>
                </div>
            </div>

            <div className="px-5">
                {/* Mid  */}
                <div className="mid mb-5">
                    {/* main  */}
                    {getUser.filter((obj) => obj.uid.includes(user?.user?.uid)).map((value, index) => {
                        console.log(value)
                        return (
                            <div key={index} className=" bg-indigo-50 py-5 rounded-xl border border-indigo-100">
                                {/* image  */}
                                <div className="flex justify-center">
                                    <img className='w-20' src={value.image} alt="" />
                                </div>
                                {/* text  */}
                                <div className="">
                                    {/* Name  */}
                                    <h1 className=" text-center text-lg">
                                        <span className=" font-bold">Name : </span>
                                        {value.user.name}
                                    </h1>

                                    {/* Email  */}
                                    <h1 className=" text-center text-lg">
                                        <span className=" font-bold">Email : </span>
                                        {user.user.email}
                                    </h1>

                                    {/* Role  */}
                                    <h1 className=" text-center text-lg">
                                        <span className=" font-bold">Role : </span>
                                        user
                                    </h1>

                                    <div className="flex justify-center mt-2 space-x-4">
                                      <Link to={'/create-room'}><Button className=' px-6 py-2 bg-indigo-400'>Create</Button></Link> 
                                    
                                        <div className="">
                                            <Button onClick={logout} className=' px-6 py-2 bg-indigo-400'>Logout</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>

                {user ? <div className="px-5">
                    {/* Bottom */}
                    <div className="">
                        <Tabs>
                            <TabList className="flex flex-wrap -m-4 text-center justify-center ">
                                {/* Total Products */}
                                <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer outline-none">
                                    <div className=" border bg-indigo-50 hover:bg-indigo-100 border-indigo-100 px-4 py-3 rounded-xl" >
                                        <div className="text-indigo-500 w-12 h-12 mb-3 inline-block" >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={50}
                                                height={50}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-shopping-basket"
                                            >
                                                <path d="m5 11 4-7" />
                                                <path d="m19 11-4-7" />
                                                <path d="M2 11h20" />
                                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                                <path d="m9 11 1 9" />
                                                <path d="M4.5 15.5h15" />
                                                <path d="m15 11-1 9" />
                                            </svg>

                                        </div>
                                        <h2 className="title-font font-medium text-3xl text-indigo-400 fonts1" >{getAllRoom.filter((obj)=> obj.userId === userId.uid).length}</h2>
                                        <p className=" text-indigo-500  font-bold" >Total Room</p>
                                    </div>
                                </Tab>

                                <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer outline-none">
                                    <div className=" border bg-indigo-50 hover:bg-indigo-100 border-indigo-100 px-4 py-3 rounded-xl" >
                                        <div className="text-indigo-500 w-12 h-12 mb-3 inline-block" >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={50}
                                                height={50}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-shopping-basket"
                                            >
                                                <path d="m5 11 4-7" />
                                                <path d="m19 11-4-7" />
                                                <path d="M2 11h20" />
                                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                                <path d="m9 11 1 9" />
                                                <path d="M4.5 15.5h15" />
                                                <path d="m15 11-1 9" />
                                            </svg>

                                        </div>
                                        <h2 className="title-font font-medium text-3xl text-indigo-400 fonts1" >{getUserQuery.filter((obj) => obj.userId === user?.user?.uid).length}</h2>
                                        <p className=" text-indigo-500  font-bold" >Total User Query</p>
                                    </div>
                                </Tab>


                            </TabList>

                            <TabPanel>
                                <RoomDetail />
                            </TabPanel>

                            <TabPanel>
                                <UserQueryDetail />
                            </TabPanel>


                        </Tabs>
                    </div>
                </div> : ""}
            </div>
        </div>
    );
}

export default Dashboard;
