import { CategoriesLoader } from '../../components/Services/CategoriesLoader'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import MarketingSection from './MarketingSection'
import { Products } from '../../components/TopProducts'
import { ProductsLoader } from '../../components/Services/ProductsLoader'

function Home() {
  return (
    <div>
      <ProductsLoader />
      <CategoriesLoader />
      <Header />
      <HeroSection />
      <MarketingSection />
      <Products />
      <Footer />
    </div>
  )
}

export default Home
