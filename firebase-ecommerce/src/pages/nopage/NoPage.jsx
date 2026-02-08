import { Link } from "react-router-dom"
import { MdKeyboardBackspace } from "react-icons/md";
import Layout from "../../components/layout/Layout";
function NoPage() {
  return (
    <Layout>

      <div className="flex flex-col items-center justify-center">

        <img src="https://static.vecteezy.com/system/resources/previews/011/314/463/original/illustrations-frustrated-expression-business-man-for-oops-404-error-design-concept-landing-page-vector.jpg" alt="404 Not Found" className="max-w-full max-h-[80vh] object-contain" />

        <Link to="/" className="flex items-center gap-2 font-semibold mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-400">
          <MdKeyboardBackspace className="text-2xl" /> Go to Home
        </Link>

      </div>
    </Layout>


  )
}

export default NoPage