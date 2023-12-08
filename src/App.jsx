import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Routes from "./Routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes />
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
