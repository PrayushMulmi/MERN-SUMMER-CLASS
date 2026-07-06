import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

function App() {
  return (
    <>
      <Header />
      <div
        className=" flex h-[85vh] items-center

justify-center"
      >
        <Button />
      </div>
      <Footer />
    </>
  );
}

export default App;
