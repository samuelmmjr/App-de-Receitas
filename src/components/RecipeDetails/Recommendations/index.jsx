import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';
import styles from './recommendations.module.scss';
import DetailContext from '../../../context/DetailScreen/DetailContext';

function Recommendations({ name, category }) {
  const { recommendedRecipes } = useContext(DetailContext);
  let path = '/comidas';
  if (name === 'Drink') path = '/bebidas';

  return (
    <div>
      <h2>Recommended</h2>
      <div className={ styles.recommendations }>
        {recommendedRecipes.map((recipe, index) => (
          <Cards
            id={ recipe[`id${name}`] }
            path={ path }
            index={ index }
            key={ index }
            category={ recipe[category] }
            name={ recipe[`str${name}`] }
            thumb={ recipe[`str${name}Thumb`] }
          />))}
      </div>
    </div>
  );
}

export default Recommendations;

Recommendations.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
