import React from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";


export default function Nav() {
    const [openNav, setOpenNav] = React.useState(false);

    const context = useContext(myContext);
    const { mode, toggleMode } = context;

    const user = JSON.parse(localStorage.getItem("user"));

    const navList = (
        <ul className={`mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`p-1 font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'} fontPara`}

            >
                <Link to={'/'} className="flex items-center">
                    Home
                </Link>
            </Typography>

            {user ? "" : <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`p-1 font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'} fontPara`}

            >
                <Link to={'/signup'} className="flex items-center">
                    Signup
                </Link>
            </Typography>
            }

            {user ? "" : <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`p-1 font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'} fontPara`}

            >
                <Link to={'/login'} className="flex items-center">
                    Login
                </Link>
            </Typography>}

            {user && <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`p-1 font-semibold ${mode === 'dark' ? 'text-white' : 'text-black'} fontPara`}

            >
                <Link to={'/dashboard'} className="flex items-center">
                    Dashboard
                </Link>
            </Typography>}

        </ul>
    );

    return (
        <>
            <Navbar className={`sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-3 lg:py-2 bg-gray-300 `}
                style={{ background: mode === 'dark' ? '#1E293B' : '' }}>
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={'/'}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"

                        >

                            {mode === 'light' ?
                                <img className=' w-10 h-10 App-logo' src='../../img/Logo_Dark.png' />
                                : <img className=' w-10 h-10 App-logo' src='../../img/Logo_White.png' />
                            }
                            <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>Calgary Help</span>
                        </Typography>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className=" hidden lg:block">{navList}</div>

                        {/* ShareModal  */}
                        {/* <div className=" hidden lg:block md:block sm:block">
              <ShareModal />
            </div> */}

                        {/* Light And Dark  */}
                        <div className="">
                            {mode === 'light' ?
                                <button className={`bg-gray-300 p-1.5 rounded-full cursor-pointer ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                                    <svg
                                        onClick={toggleMode}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={27}
                                        height={27}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-sun "
                                    >
                                        <circle cx={12} cy={12} r={4} />
                                        <path d="M12 2v2" />
                                        <path d="M12 20v2" />
                                        <path d="m4.93 4.93 1.41 1.41" />
                                        <path d="m17.66 17.66 1.41 1.41" />
                                        <path d="M2 12h2" />
                                        <path d="M20 12h2" />
                                        <path d="m6.34 17.66-1.41 1.41" />
                                        <path d="m19.07 4.93-1.41 1.41" />
                                    </svg>

                                </button> :
                                <button className="text-white hover:bg-gray-800 p-1.5 rounded-full cursor-pointer ">
                                    <svg
                                        onClick={toggleMode}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={27}
                                        height={27}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-moon text-white"
                                    >
                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                    </svg>

                                </button>
                            }
                        </div>

                        {/* SearchBox  */}
                        {/* <div className="">
              <SearchBox />
            </div> */}

                        {/* ToggleMode  */}
                        <div className="">
                            <IconButton
                                // variant="text"
                                className="ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                                style={{ background: mode === 'light' ? '#ced6e0' : '#57606f', color: mode === 'dark' ? 'white' : 'black' }}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>
        </>
    );
}