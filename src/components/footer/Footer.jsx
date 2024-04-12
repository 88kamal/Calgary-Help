import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <div>
            {/* footer  */}
            <footer className={`text-gray-600 body-font bg-gray-300 `} style={{ background: mode === 'dark' ? '#1E293B' : '' }}>
                {/* main  */}
                <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
                    {/* logo  */}
                    <a className="flex title-font font-medium items-center md:justify-start justify-center "
                        style={{
                            color: mode === 'dark' ? 'text-white' : 'text-black'
                        }}>
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
                    </a>
                    {/* para  */}
                    <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4" style={{
                        color: mode === 'dark' ? 'text-white' : 'text-black'
                    }}>
                        © 2024 Calgary Help —
                        <Link
                            to={'/'}
                            style={{
                                color: mode === 'dark' ? 'text-white' : 'text-black'
                            }}
                            className=" ml-1"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            @Calgary Help
                        </Link>
                    </p>

                    {/* media icon  */}
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start" >
                        {/* facebook  */}
                        <a className="cursor-pointer">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>

                        {/* twitter  */}
                        <a className="ml-3 cursor-pointer">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>

                        {/* instagram  */}
                        <a className="ml-3 cursor-pointer">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>

                        {/* linkedIn  */}
                        <a className="ml-3 cursor-pointer">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;