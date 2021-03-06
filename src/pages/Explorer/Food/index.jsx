import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { fetchRandomApiFood } from '../../../services/recipesApi';

function ExploreFoods() {
  const [idMeal, setIdMeal] = useState('');

  useEffect(() => {
    const getId = async () => {
      const { idMeal: id } = await fetchRandomApiFood();
      setIdMeal(id);
    };
    getId();
  }, []);
  return (
    <div>
      <Header title="Explorar Comidas" icon="false" />
      <a href="/explorar/comidas/ingredientes">
        <h2 data-testid="explore-by-ingredient">Por Ingredientes</h2>
      </a>
      <a href="/explorar/comidas/area">
        <h2 data-testid="explore-by-area">Por Local de Origem</h2>
      </a>
      <a href={ `/comidas/${idMeal}` }>
        <h2 data-testid="explore-surprise">Me Surpreenda!</h2>
      </a>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
