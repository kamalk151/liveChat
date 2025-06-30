import React from "react"

export default function Portfolio() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <span className="text-2xl font-bold text-indigo-700">Team Portfolio</span>
          <nav className="space-x-6">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#projects" className="hover:text-indigo-600">Projects</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-6 text-center flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Person 1 */}
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Person 1"
              className="w-32 h-32 rounded-full border-4 border-indigo-400 shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-indigo-800">Kamal Kumar</h2>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          {/* Person 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Person 2"
              className="w-32 h-32 rounded-full border-4 border-pink-400 shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-pink-700">Ankit Singh</h2>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mt-10 mb-4">
          We Build Modern MERN Applications
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          10+ years combined experience in scalable web solutions.
        </p>
        <a
          href="#projects"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
        >
          View Our Work
        </a>
      </section>

      {/* About Us */}
      <section id="about" className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">About Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Kamal Kumar</h3>
            <p className="text-gray-700 mb-4">
              MERN stack specialist with a passion for scalable backend systems, cloud deployment, and real-time applications. Loves mentoring and building robust APIs.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Node.js</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Express</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">MongoDB</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">AWS</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">Ankit Singh</h3>
            <p className="text-gray-700 mb-4">
              Frontend expert with a keen eye for UI/UX, React wizardry, and seamless user experiences. Enjoys crafting beautiful interfaces and interactive dashboards.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">React</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">TypeScript</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Tailwind CSS</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Figma</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Projects</h2>
        <div className="grid md:grid-cols-1 gap-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                alt="Live Chat App"
                className="rounded-lg mb-4 h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Live Chat Application</h3>
              <p className="text-gray-600 mb-2">
                Real-time chat app with video calling, built using MERN, WebRTC, and Socket.io.
              </p>
              <a
                href="https://github.com/kamalk151/liveChat"
                className="text-indigo-600 hover:underline mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                alt="E-commerce Platform"
                className="rounded-lg mb-4 h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
              <p className="text-gray-600 mb-2">
                Scalable online store with secure payments, admin dashboard, and analytics.
              </p>
              <a
                href="https://github.com/kamalk151/ecom"
                className="text-indigo-600 hover:underline mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            {/* Project Card 3 - Real Estate */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="Real Estate Portal"
                className="rounded-lg mb-4 h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Real Estate Portal</h3>
              <p className="text-gray-600 mb-2">
                Feature-rich real estate platform for property listings, agent dashboards, and interactive maps. Built with MERN, Mapbox, and cloud image storage.
              </p>
              <a
                href="https://github.com/kamalk151/realestate"
                className="text-indigo-600 hover:underline mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            {/* Project Card 4 - Saifi Online Store */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1080,h=1054,fit=crop/YbNBPrKooeFr7LoQ/gemini_generated_image_yuncjyyuncjyyunc-A1aP22b49Dc4OMpo.jpeg"
                alt="Saifi Online Store"
                className="rounded-lg mb-4 h-40 object-cover bg-gray-100"
              />
              <h3 className="text-xl font-semibold mb-2">Saifi Online Store</h3>
              <p className="text-gray-600 mb-2">
                Saifi Online Store combines seamless online shopping with the reliability of an offline store, specializing in Quality Products and convenient Banking Outlet Services
              </p>
              <a
                href="https://saifionlinestore.com/"
                className="text-indigo-600 hover:underline mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      {/* Contact */}
      <section id="contact" className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Contact</h2>
        <p className="text-gray-700 mb-6">
          Interested in working together or have a question? Send us a query!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Kamal Kumar</h3>
            <p className="text-gray-600 mb-1">📧 kamal.kumar@email.com</p>
            <p className="text-gray-600">📞 +91-9876543210</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Ankit Singh</h3>
            <p className="text-gray-600 mb-1">📧 ankit.singh@email.com</p>
            <p className="text-gray-600">📞 +91-9123456780</p>
          </div>
        </div>
        <form
          className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 flex flex-col gap-4"
          // onSubmit={''}
        >
          <label className="text-left font-semibold mb-1" htmlFor="recipient">
            Send To
          </label>
          <select
            id="recipient"
            name="recipient"
            className="border rounded px-3 py-2"
            required
          >
            <option value="">Select recipient</option>
            <option value="kamal.kumar@email.com">Kamal Kumar</option>
            <option value="ankit.singh@email.com">Ankit Singh</option>
          </select>

          <label className="text-left font-semibold mb-1" htmlFor="email">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border rounded px-3 py-2"
            placeholder="your.email@example.com"
            required
          />

          <label className="text-left font-semibold mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="border rounded px-3 py-2"
            rows={4}
            placeholder="Type your query here..."
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
          >
            Send Query
          </button>
        </form>
      </section>
      {/* Footer */}
      <footer className="bg-white py-4 mt-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Kamal Kumar & Ankit Singh. All rights reserved.
      </footer>
    </div>
  )
}