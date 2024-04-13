import { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Select,
    Option,
    Textarea
} from "@material-tailwind/react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";


const CreateRoom = () => {
    const context = useContext(myContext);
    const { mode, loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const [roomDetail, setRoomDetail] = useState({
        name: "",
        price: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",
        furnished: "",
        address: "",
        desc: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
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


    const addRoomDetail = async () => {
        // console.log({
        //     name: roomDetail.name,
        //     price: roomDetail.price,
        //     type: roomDetail.type,
        //     bedrooms: roomDetail.bathrooms,
        //     bathrooms: roomDetail.bathrooms,
        //     parking: roomDetail.parking,
        //     furnished: roomDetail.furnished,
        //     address: roomDetail.address,
        //     description: roomDetail.desc,
        //     image1: roomDetail.image1,
        //     image2: roomDetail.image2,
        //     image3: roomDetail.image3,
        //     image4: roomDetail.image4,
        // })
        if (roomDetail.name == "" || roomDetail.price == "" || roomDetail.type == "" || roomDetail.bedrooms == "" || roomDetail.bathrooms == "" || roomDetail.parking == "" || roomDetail.furnished == "" || roomDetail.address == "" || roomDetail.desc == "" || roomDetail.image1 == "" || roomDetail.image2 == "" || roomDetail.image3 == "" || roomDetail.image4 == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'room');
            await addDoc(productRef, roomDetail)
            toast.success("Create Room Successfully");
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Create Room failed");
        }

    }


    return (
        <div className="flex justify-center items-center lg:h-screen  ">
            {loading && <Loader />}
            {/* Card  */}
            <Card className="w-full max-w-[34rem]"
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

                    {/* Signup  */}
                    <Typography
                        variant="h4"
                        style={{
                            color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                : 'rgb(226, 232, 240)'
                        }}
                    >
                        Create Listing
                    </Typography>
                </CardHeader>

                {/* Card Body  */}
                <CardBody>
                    <form className=" flex flex-col gap-4">
                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Input type="text"
                                    label="Name"
                                    name="name"
                                    value={roomDetail.name}
                                    className="w-[25em] lg:w-60"
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div>
                                <Input type="text"
                                    label="Price"
                                    name="price"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.price}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            price: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Select label="Select Type of Listing"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.type} onChange={(value) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            type: value
                                        })
                                    }}
                                >
                                    <Option value="sale">Sale</Option>
                                    <Option value="rent">Rent</Option>
                                </Select>
                            </div>

                            <div>
                                <Input type="number"
                                    className="w-[25em] lg:w-60"
                                    label="No of Bedroom"
                                    name="bedroom"
                                    value={roomDetail.bedrooms}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            bedrooms: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>


                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Input type="number"
                                    label="No of Bathroom"
                                    name="bathroom"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.bathrooms}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            bathrooms: e.target.value
                                        })
                                    }}
                                />
                            </div>


                            <div>
                                <Select label="Select Parking"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.parking} onChange={(value) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            parking: value
                                        })
                                    }}
                                >
                                    <Option value="yes">Yes</Option>
                                    <Option value="no">No</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Select label="Select Furnished"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.furnished} onChange={(value) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            furnished: value
                                        })
                                    }}
                                >
                                    <Option value="yes">Yes</Option>
                                    <Option value="no">No</Option>
                                </Select>
                            </div>

                            <div>
                                <Input type="text"
                                    label="Address"
                                    name="address"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.address}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            address: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Input type="text"
                                    label="Image Url One"
                                    name="image1"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.image1}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            image1: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div>
                                <Input type="text"
                                    label="Image Url Two"
                                    name="image2"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.image2}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            image2: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
                            <div>
                                <Input type="text"
                                    label="Image Url three"
                                    name="image3"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.image3}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            image3: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div>
                                <Input type="text"
                                    label="Image Url Four"
                                    name="image4"
                                    className="w-[25em] lg:w-60"
                                    value={roomDetail.image4}
                                    onChange={(e) => {
                                        setRoomDetail({
                                            ...roomDetail,
                                            image4: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Textarea type="text"
                                label="Description"
                                name="description"
                                value={roomDetail.desc}
                                onChange={(e) => {
                                    setRoomDetail({
                                        ...roomDetail,
                                        desc: e.target.value
                                    })
                                }}
                            />
                        </div>

                        {/* Signup Button  */}
                        <Button
                            onClick={addRoomDetail}
                            style={{
                                background: mode === 'dark' ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }}>
                            Create Listing
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>

    );
}

export default CreateRoom;
