import { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import { Button } from '@material-tailwind/react';

const Job = () => {
    const context = useContext(myContext);
    const { mode, getAllJob } = context;

    return (
        <Layout>
            <section className="text-gray-600 body-font">
                <div className=" px-5 py-8 mx-auto">
                <div className="">
                <h2 className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-center text-2xl fontPara mb-5`}>All Job</h2>
            </div>
                    <div className="flex flex-wrap -m-4">
                        {getAllJob.length > 0 ?
                            <>
                                {getAllJob.map((item, index) => {
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
