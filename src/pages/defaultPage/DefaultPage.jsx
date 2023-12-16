import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function DefaultPage({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
