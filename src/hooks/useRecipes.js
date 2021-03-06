import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/recipesApi';

function useRecipes(domain, key, amount) {
  const DEFAULT_AMOUNT = 12;
  const RECIPES_AMOUNT = amount || DEFAULT_AMOUNT;
  const [recipes, setRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function requestRecipes() {
      const res = await fetchRecipes(domain, key, RECIPES_AMOUNT);
      setRecipes(res);
      setIsFetching(false);
    }
    requestRecipes();
  }, [domain, key, RECIPES_AMOUNT]);

  return [recipes, isFetching];
}

export default useRecipes;
