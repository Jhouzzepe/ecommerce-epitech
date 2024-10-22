import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import PoloCapyBrun from '../../assets/PoloCapyBrun(avant).png';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category-products/${categoryId}`);
  };

  return (
    <section>
    <div className="container px-6 py-10 mx-auto
    ">
      <h1 className="flex justify-center text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">Catégories :</h1>

      <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        {categories.map(category => (
          <div key={category.id} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-[#2E4033] shadow-md duration-300 hover:scale-105 hover:shadow-lg" onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
              <img className="h-128 w-full object-cover object-center" 
              src={
                category.name === 'Polo' ? PoloCapyBrun :
                category.name === 'Epitech' ? "https://capsup.cio-montlucon.fr/wp-content/uploads/2016/10/th-1-300x300.jpg" :
                category.name === 'Ch"nord' ? "https://fr.web.img2.acsta.net/medias/nmedia/18/79/51/22/19732939.jpg" :
                category.name === 'Amerika' ? "https://www.aviso-drapeaux.com/31007-large_default/drapeau-etats-unis-60x90-cm.jpg" :
                category.name === 'Législatives 2024' ? "https://la1ere.francetvinfo.fr/image/tG3cgi_rWdGg2zhv8pFfpMdMNDo/1200x1200/outremer/2022/06/11/62a49b9ce4d6a_62a3870a37143-candidats-legislatives-1.webp" :
                category.name === 'W@C' ? "https://pbs.twimg.com/profile_images/1191402122589429760/bUZx046w_400x400.jpg" :
                "https://i.ebayimg.com/images/g/4IsAAOSwpddgqEwp/s-l1200.jpg"
              } alt={category.name} />            
              <div className="p-4 bg-[#2E4033]">
              <h2 className="flex justify-center mb-2 text-lg font-medium dark:text-white text-gray-900">{category.name}</h2>
              <p className="mb-2 text-base text-gray-300">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Categories;
