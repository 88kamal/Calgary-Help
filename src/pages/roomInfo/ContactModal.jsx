/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import myContext from "../../context/myContext";
export function ContactModal({  userDetail, setUserDetail, handleSendDetail}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const context = useContext(myContext);
    const { mode } = context;
    return (
        <>
            <Button onClick={handleOpen} className="w-full mt-4 bg-[#29364b] hover:shadow-none shadow-none">
                Contact Room Owner
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}

                style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '' }}
            >
                <DialogHeader>Contact Room Owner.</DialogHeader>
                <DialogBody>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userDetail.name}
                        name="name"
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetail,
                                name: e.target.value
                            })
                        }}
                        className={`py-1.5 outline-none border  w-full mb-4
                            ${mode === 'dark' ? ' placeholder-blue-gray-300' : 'text-'}
                        ${mode === 'dark' ? ' text-[#c095ff]' : 'text-'}
                        ${mode === 'dark' ? 'border-blue-gray-300' : 'border-blue-gray-200'} px-2 rounded 
                        ${mode === 'dark' ? 'bg-[#1E273A]' : 'bg-gray-50'}`}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={userDetail.email}
                        name="email"
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetail,
                                email: e.target.value
                            })
                        }}
                        className={`py-1.5 outline-none border  w-full mb-4
                            ${mode === 'dark' ? ' placeholder-blue-gray-300' : 'text-'}
                        ${mode === 'dark' ? ' text-[#c095ff]' : 'text-'}
                        ${mode === 'dark' ? 'border-blue-gray-300' : 'border-blue-gray-200'} px-2 rounded 
                        ${mode === 'dark' ? 'bg-[#1E273A]' : 'bg-gray-50'}`}
                    />


                    <input
                        type="number"
                        placeholder="Phone Number"
                        value={userDetail.phoneNumber}
                        name="phoneNumber"
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetail,
                                phoneNumber: e.target.value
                            })
                        }}
                        className={`py-1.5 outline-none border  w-full 
                            ${mode === 'dark' ? ' placeholder-blue-gray-300' : 'text-'}
                        ${mode === 'dark' ? ' text-[#c095ff]' : 'text-'}
                        ${mode === 'dark' ? 'border-blue-gray-300' : 'border-blue-gray-200'} px-2 rounded 
                        ${mode === 'dark' ? 'bg-[#1E273A]' : 'bg-gray-50'}`}
                    />


                </DialogBody>
                <DialogFooter>
                    <Button className="w-full -mt-3 primaryBgColor" onClick={() => {
                        handleOpen();
                        handleSendDetail();
                    }}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}