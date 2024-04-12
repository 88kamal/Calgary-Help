import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import RoomCard from "../../components/roomCard/RoomCard";
import Testimonial from "../../components/testimonials/Testimonial";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>

            <RoomCard/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;
