import Link from 'next/link'
export default function Signup() {

  return (
   <div className="feedback-container max-w-2xl mx-auto px-4 py-10">
    <div className="bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">New User</h1>
      <p className="text-gray-600 text-center mb-6">
        Already registered user? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
      <form className="space-y-5">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>

  )
}
