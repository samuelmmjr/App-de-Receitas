import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useRecipeDetails from '../../../hooks/useRecipeDetails';
import data from '../../../helpers/apiData';
import '../../../styles/global.scss';

import Loading from '../../../components/Loading';
import BasicInfo from '../../../components/RecipeDetails/BasicInfo';
import InteractiveButtons from '../../../components/RecipeDetails/InteractiveButtons';
import Instructions from '../../../components/RecipeDetails/Instructions';
import Steps from './components/Steps';
import Button from './components/Button';

function DetailScreen() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const foodOrDrink = pathname.split('/')[1];
  const { domain, key } = data[foodOrDrink];

  const [isLoading, setIsLoading] = useState(true);
  const [recipeDetails, isFetchingDetails] = useRecipeDetails(domain, key, id);

  const type = {
    name: data[foodOrDrink].name,
    category: data[foodOrDrink].category,
    nameRecommend: data[foodOrDrink].nameRecommend,
    categoryRecommend: data[foodOrDrink].categoryRecommend,
  };

  useEffect(() => {
    setIsLoading(isFetchingDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingDetails]);

  function handleStorage() {
    let duplicated = false;
    let savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let alcoholicOrNot = '';
    let area = '';
    if (type.category === 'strAlcoholic') alcoholicOrNot = 'Alcoholic';
    if (recipeDetails.strArea) area = recipeDetails.strArea;

    const favoriteRecipe = {
      id: recipeDetails[`id${type.name}`],
      type: foodOrDrink.split('s')[0],
      area,
      category: recipeDetails.strCategory,
      alcoholicOrNot,
      name: recipeDetails[`str${type.name}`],
      image: recipeDetails[`str${type.name}Thumb`],
    };

    if (savedRecipes) {
      savedRecipes = savedRecipes
        .filter(({ id: recipeId }) => {
          const isNotDuplicated = recipeId !== recipeDetails[`id${type.name}`];
          if (!isNotDuplicated) duplicated = true;
          return isNotDuplicated;
        });
      if (duplicated) {
        return localStorage
          .setItem('favoriteRecipes', JSON.stringify(savedRecipes));
      }
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify([...savedRecipes, favoriteRecipe]));
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
  }

  function renderDetails() {
    return (
      <>
        <BasicInfo
          name={ type.name }
          category={ type.category }
          recipe={ recipeDetails }
        />
        <InteractiveButtons handleStorage={ handleStorage } id={ id } />
        <Steps origin={ foodOrDrink } recipe={ recipeDetails } />
        <Instructions name={ type.name } recipe={ recipeDetails } />
        <Button />
      </>
    );
  }

  return (
    <div>
      {isLoading ? <Loading /> : renderDetails()}
    </div>

  );
}

export default DetailScreen;