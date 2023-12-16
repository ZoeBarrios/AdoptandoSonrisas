import About from "../../components/about/About";
import DonationInfo from "../../components/donationInfo/DonationInfo";
import Banner from "../../components/banner/Banner";
import "./Home.css";
import AboutRegister from "../../components/aboutRegister/AboutRegister";
import DefaultPage from "../defaultPage/DefaultPage";
export default function Home() {
  return (
    <DefaultPage>
      <Banner />
      <main className="home">
        <About />
        <DonationInfo />
        <AboutRegister />
      </main>
    </DefaultPage>
  );
}
