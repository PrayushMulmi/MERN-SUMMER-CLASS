function Header() {
  return (
    <header className="">
      <nav className="bg-green-900 text-white p-6 h-20">
        <div className="float-left">
          <a href="http://localhost5173" className="text-2xl">
            Task Tracker
          </a>
        </div>
        <div className="float-right mr-5">
          JavaScript
          <a
            href="#"
            className="ml-5 text-amber-200

hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="ml-5 text-amber-200

hover:text-white"
          >
            About
          </a>
          <a
            href="#"
            className="ml-5 text-amber-200

hover:text-white"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
export default Header;
