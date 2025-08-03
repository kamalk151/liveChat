import Link from 'next/link';
// Add these inline or import from separate files
function Header() {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Brand + Welcome */}
        <div className="mb-2 sm:mb-0">
          <h1 className="text-2xl font-bold tracking-tight">
            <Link href="/" >Pal Hola </Link></h1>
          <p className="text-sm text-gray-300">Welcome to Pal Hola - Live Chat</p>
        </div>

        {/* Navigation */}
        <nav className="mb-2 sm:mb-0">
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <p className="text-green-400 font-semibold">
                28,432 Online Now
              </p>
            </li>
            <li><Link href="/login"  className="hover:underline">Account</Link></li>
            <li><Link href="/feedback" className="hover:underline">Feedback</Link></li>
          </ul>
        </nav>

        {/* Online Users */}
        {/* <div className="text-right text-sm">
        </div> */}
      </div>
    </header>
  )
}

export default Header