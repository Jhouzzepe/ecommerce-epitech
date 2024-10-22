import { useProducts } from "../../contexts/ProductContext";
import ProductItem from "../ProductItem";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

const Home = () => {
  const { products } = useProducts();

  return (
    <div className="container mx-auto p-6 bg-[#2E4033] text-white my-12 rounded-lg">

      <header className="text-center my-8">
        <h1 className="text-5xl font-extrabold text-[#FFEB8A]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}> Bienvenue sur Papuche </h1>
        <p className="text-xl text-[#E7C248] mt-4" style={{ fontFamily: "'Lora', serif", fontStyle: 'italic' }}> Découvrez nos produits les plus populaires </p>
        <div className="mt-8">
          <Link 
            to="/product" 
            className="px-8 py-3 bg-[#A88030] text-white text-lg font-semibold rounded hover:bg-[#E7C248] transition duration-300"
            aria-label="Voir tous les produits"
          >
            Voir tous les produits
          </Link>
        </div>
      </header>
      <section 
        className="relative bg-cover bg-center bg-no-repeat h-64 mb-8 rounded-lg shadow-lg overflow-hidden pt-20 bg-special-offers" 
        style={{ backgroundImage: "url('/BanniereCapy2.png')" }}
        aria-label="Offres Spéciales"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold animate-bounce">Offres Spéciales</h2>
          <p className="text-lg mt-2">Profitez de nos réductions exclusives</p>
          <button 
            className="mt-4 px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-700 transition duration-300"
            aria-label="En savoir plus sur les offres spéciales"
          >
            En savoir plus
          </button>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 ml-24">
        {products.map(product => (
          <ProductItem 
            key={product.id} product={product} 
            className="transition transform hover:scale-105 hover:shadow-xl bg-white text-black rounded-lg p-4" 
            aria-label={`Produit ${product.name}`}
          />
        ))}
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-[#FFEB8A]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
          Découvrez notre nouveau jeu Capyjump!
        </h2>
        <p className="text-lg text-[#E7C248] mt-4" style={{ fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
          Tentez de gagner des réductions grâce à Michel et ses sauts !
        </p>
        <div className="mt-4">
          <Link 
            to="/Capyjump" 
            className="px-8 py-3 bg-[#A88030] text-white text-lg font-semibold rounded hover:bg-[#E7C248] transition duration-300"
            aria-label="Jouer à Capyjump"
          >
            Jouer à Capyjump
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
