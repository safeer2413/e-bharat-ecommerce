import Category from "../../components/category/Category"
import FeatureTrack from "../../components/featureService/FeatureTrack"
import HeroSection from "../../components/heroSection/HeroSection"
import Layout from "../../components/layout/Layout"
import ProductCard from "../../components/productCard/ProductCard"
import Testimonial from "../../components/testimonial/Testimonial"

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <ProductCard />
      <FeatureTrack />
      <Testimonial />
    </Layout>
  )
}

export default HomePage