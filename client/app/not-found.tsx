
export default function NotFoundPage() {
  return (
    <div className="text-center mt-12 bg-white">
      <img
        src="/images/404-not.jpeg"
        alt="Not Found"
        className="max-w-md mt-5 mx-auto"
      />
      <h2 className="text-2xl font-bold mt-4">
        Oops! The page you are looking for does not exist.
      </h2>
      <p className="mt-4">
        <a href="/" className="text-blue-600 underline">
          Go back to Home
        </a>
      </p>
    </div>
  )
}