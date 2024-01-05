import React from 'react'

export function Footer() {
  return (
    <footer className=" bg-gray-200 py-8 sticky top-[100vh] ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h3 className=" text-lg font-bold mb-4">Subscribe in our newsletter</h3>
            <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email"
                className=" py-2 px-4 rounded mb-4 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Send
              </button>
            </form>
          </div>
          <div>
            <h3 className=" text-lg font-bold mb-4">About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut ante vitae magna
              hendrerit tincidunt. Phasellus maximus ligula eget sapien fermentum, eu commodo lectus
              ultricies.
            </p>
          </div>
          <div>
            <h3 className=" text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
