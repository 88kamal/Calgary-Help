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
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";


const CreateRoom = () => {
    const context = useContext(myContext);
    const { mode, loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        const fileList = e.target.files;
        setImages(Array.from(fileList));
    };





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
    });



    const addRoomDetail = async () => {
        if (roomDetail.name == "" || roomDetail.price == "" || roomDetail.type == "" || roomDetail.bedrooms == "" || roomDetail.bathrooms == "" || roomDetail.parking == "" || roomDetail.furnished == "" || roomDetail.address == "" || roomDetail.desc == "" || roomDetail.image1 == "" || roomDetail.image2 == "" || roomDetail.image3 == "" || roomDetail.image4 == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                console.log("An error occured");
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }

        // eslint-disable-next-line no-unused-vars
        const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
        });

        const roomRef = collection(fireDB, 'room');

        await addDoc(roomRef, {
            name: roomDetail.name,
            price: roomDetail.price,
            type: roomDetail.type,
            bedrooms: roomDetail.bedrooms,
            bathrooms: roomDetail.bathrooms,
            parking: roomDetail.parking,
            furnished: roomDetail.furnished,
            address: roomDetail.address,
            desc: roomDetail.desc,
            image: imgUrls,
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

        toast.success("Room Added Successfully");
        navigate("/dashboard")
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
                                    className="w-[25.2em] lg:w-60"
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
                                    className="w-[25.2em] lg:w-60"
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
                                    className="w-[25.2em] lg:w-60"
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
                                    className="w-[25.2em] lg:w-60"
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
                                    className="w-[25.2em] lg:w-60"
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

                        {/* <div className="flex flex-wrap gap-3 lg:gap-0 justify-between">
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
                        </div> */}

                        <div className="">
                            <input type="file"
                                required={images.length === 0}
                                className=" border w-full border-gray-400 p-1.5 rounded-lg" onChange={handleFileChange} multiple />
                        </div>

                        <div className="flex justify-between">
                            {images.length > 0 && <>
                                {images.map((image, i) => {
                                    return (
                                        <img className="w-28 rounded-lg" key={i} src={image ? URL.createObjectURL(image) : ""} alt="img" />
                                    )
                                })}
                            </>
                            }
                            {images.length < 4 && <p style={{ color: "red" }} className="-mt-2">Minimum 4 images required</p>}
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
