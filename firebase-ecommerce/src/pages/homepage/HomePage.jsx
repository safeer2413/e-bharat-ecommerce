import Category from "../../components/category/Category"
import FeatureTrack from "../../components/featureService/FeatureTrack"
import HeroSection from "../../components/heroSection/HeroSection"
import Layout from "../../components/layout/Layout"
import Testimonial from "../../components/testimonial/Testimonial"
import ProductList from "../../components/productList/ProductList"
import ProductShow from "../../AaaaaSample"

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <ProductList />
      <FeatureTrack />
      <Testimonial />
      {/* <ProductShow /> */}
    </Layout>
  )
}

export default HomePage