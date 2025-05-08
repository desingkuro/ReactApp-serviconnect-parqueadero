function Header() {
  return (
    <header className="bg-gray-800 text-white w-full h-16 flex justify-around items-center">
        <h1 className="text-white">Header</h1>
        <nav>
            <ul className="flex space-x-4">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/services">Services</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header