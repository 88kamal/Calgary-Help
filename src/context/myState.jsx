/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';


function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(15, 23, 42)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }

    // Loading State
    const [loading, setLoading] = useState(false);


    // User State
    const [getAllRoom, setGetAllRoom] = useState([]);

    // console.log(getAllRoom)


    /**========================================================================
     *                          GET All Product Function
     *========================================================================**/

    const getAllRoomFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "room"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let roomArray = [];
                QuerySnapshot.forEach((doc) => {
                    roomArray.push({ ...doc.data(), id: doc.id });
                });
                // console.log(roomArray)
                setGetAllRoom(roomArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // User State
    const [getUserQuery, setGetUserQuery] = useState([]);

    //  console.log(getUserQuery)
    /**========================================================================
     *                          GET All Product Function
     *========================================================================**/

    const getAllUserQueryFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "contact"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userQueryArray = [];
                QuerySnapshot.forEach((doc) => {
                    userQueryArray.push({ ...doc.data(), id: doc.id });
                });
                setGetUserQuery(userQueryArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    // user State 
    const [getAllUser, setGetAllUser] = useState([]);



    /**========================================================================
     *                           GET All User Function
     *========================================================================**/

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    const [getAllJob, setGetAllJob] = useState([]);


    /**========================================================================
     *                           GET All Job Function
     *========================================================================**/

    const getAllJobFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "job"),
                orderBy("time")
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let jobArray = [];
                QuerySnapshot.forEach((doc) => {
                    jobArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllJob(jobArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllRoomFunction();
        getAllUserQueryFunction();
        getAllUserFunction();
        getAllJobFunction();
    }, []);

    return (
        <MyContext.Provider value={{
            mode,
            toggleMode,
            loading,
            setLoading,
            getAllRoom,
            getAllRoomFunction,
            getUserQuery,
            getAllUser,
            getAllJob,
            getAllJobFunction
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState