import { useContext } from "react"
import Category from "../../components/category/Category"
import FeatureTrack from "../../components/featureService/FeatureTrack"
import HeroSection from "../../components/heroSection/HeroSection"
import Layout from "../../components/layout/Layout"
import ProductCard from "../../components/productCard/ProductCard"
import Testimonial from "../../components/testimonial/Testimonial"
import MyContext from "../../context/MyContext"

function HomePage() {
  const context = useContext(MyContext);
  const name = context.name
  return (
    <Layout>
      <HeroSection />
      <Category />
      <h1 className="text-2xl font-bold">{name}</h1>
      <ProductCard />
      <FeatureTrack />
      <Testimonial />
    </Layout>
  )
}

export default HomePage