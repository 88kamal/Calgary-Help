import { useContext, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import { Button } from '@material-tailwind/react';

const Job = () => {
    const context = useContext(myContext);
    const { mode, getAllJob } = context;


    const [search, setSearch] = useState("");

    const filterData = getAllJob.filter((obj) => obj.title.toLowerCase().includes(search))

    return (
        <Layout>
            <section className="text-gray-600 body-font">
                <div className=" px-5 py-8 mx-auto">
                    <div className=" flex flex-wrap justify-between items-center mb-5">
                        <h1 className={` mb-5 text-2xl font-semibold ${mode === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>All Room</h1>
                        <input type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`  border rounded-lg   ${mode === 'light' ? 'border-gray-300' : 'border-gray-700'}
                        outline-none
                        ${mode === 'light' ? 'bg-gray-200' : 'bg-gray-900'} w-[43em] py-1.5 px-2`} />
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {filterData.length > 0 ?
                            <>
                                {filterData.map((item, index) => {
                                    const { title, jobSite, salary, date, description } = item
                                    return (
                                        <div key={index} className="p-4 md:w-1/3 fontPara">
                                            <div className={`h-full border shadow-md ${mode === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                                                <div className="p-6">
                                                    <h2 className={`tracking-widest text-xs title-font font-medium mb-1 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-400'}`}>
                                                        Calgary Help
                                                    </h2>
                                                    <h1 className={`title-font text-lg font-medium mb-3 ${mode === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                                                        {title}
                                                    </h1>
                                                    <p className={`${mode === 'dark' ? 'text-gray-300' : 'text-black'} fontPara`}>Salary : ₹{salary}</p>
                                                    <p className={`leading-relaxed mb-3 text-justify ${mode === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                                                        {description}
                                                    </p>

                                                    <div className="flex justify-between items-center">
                                                        <a href={jobSite} target='_blank'>
                                                            <Button style={{
                                                                background: mode === 'dark' ? 'rgb(226, 232, 240)'
                                                                    : 'rgb(30, 41, 59)',
                                                                color: mode === 'dark' ? 'rgb(30, 41, 59)'
                                                                    : 'rgb(226, 232, 240)'
                                                            }} className=' py-1.5 rounded-none'>Visit Now</Button>
                                                        </a>

                                                        <p className={`${mode === 'dark' ? 'text-gray-300' : 'text-black'}`}>{date}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                            :

                            <h1>Not Found</h1>}

                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Job;
