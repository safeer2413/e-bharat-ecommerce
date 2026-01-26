import { Link } from "react-router-dom"

function NoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src="https://static.vecteezy.com/system/resources/previews/011/314/463/original/illustrations-frustrated-expression-business-man-for-oops-404-error-design-concept-landing-page-vector.jpg" alt="404 Not Found" className="max-w-full max-h-[80vh] object-contain" />
      <Link to="/" className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>

  )
}

export default NoPage