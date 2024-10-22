import React from 'react';

const MoreProduct = () => {
  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">Plus de produits</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6
      ">
        
        {/* Plus de produits - Produit 1 */}
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
          <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://i.ebayimg.com/images/g/yI8AAOSwXoZkAFc0/s-l1200.webp')` }}>
            <button className="p-2 rounded-full bg-[#2E4033] text-white mx-5 -mb-4 hover:bg-[#47925D] focus:outline-none focus:bg-green-500">
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700">T-shirt Don't worry Be Capy</h3>
            <span className="text-gray-500 mt-2">10€</span>
          </div>
        </div>

        {/* Plus de produits - Produit 2 */}
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
          <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://i.etsystatic.com/30980259/r/il/e048d7/4459281436/il_570xN.4459281436_4vd7.jpg')` }}>
            <button className="p-2 rounded-full bg-[#2E4033] text-white mx-5 -mb-4 hover:bg-[#47925D] focus:outline-none focus:bg-green-500">
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700">Polo Capybara</h3>
            <span className="text-gray-500 mt-2">15€</span>
          </div>
        </div>

        {/* Plus de produits - Produit 3 */}
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
          <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://i.ebayimg.com/images/g/yI8AAOSwXoZkAFc0/s-l1200.webp')` }}>
            <button className="p-2 rounded-full bg-[#2E4033] text-white mx-5 -mb-4 hover:bg-[#47925D] focus:outline-none focus:bg-green-500">
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700">T-shirt Capybara</h3>
            <span className="text-gray-500 mt-2">20€</span>
          </div>
        </div>

        {/* Plus de produits - Produit 4 */}
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
          <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://i.etsystatic.com/30980259/r/il/e048d7/4459281436/il_570xN.4459281436_4vd7.jpg')` }}>
            <button className="p-2 rounded-full bg-[#2E4033] text-white mx-5 -mb-4 hover:bg-[#47925D] focus:outline-none focus:bg-green-500">
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700">Polo Capybara</h3>
            <span className="text-gray-500 mt-2">8€</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoreProduct;