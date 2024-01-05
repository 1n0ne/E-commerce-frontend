import { Link } from 'react-router-dom'
import heroImage from '../img/heroimage.jpg'

export function HeroSection() {
  return (
    <div className="relative">
      <img src={heroImage} className=" w-full object-cover grayscale-img" alt="Hero Image" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-white text-4xl sm:text-3xl font-bold mb-4">ELECTOR STORE</h2>
        <p className="text-white text-xl sm:text-xl mb-6">
          Discover the electrifying world of e-commerce and power up your shopping experience!
        </p>
        <Link to="/All-Products">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  )
}
export default HeroSection
