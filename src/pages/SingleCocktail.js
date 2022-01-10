import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [cocktail, setCocktail] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const fetchCocktail = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      const cocktail = data.drinks[0]
      console.log(cocktail)
      if (cocktail) {
        const {
          idDrink: id,
          strDrink: name,
          strCategory: category,
          strAlcoholic: alcohol,
          strGlass: glass,
          strInstructions: info,
          strDrinkThumb: image,

          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = cocktail
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]

        const newCocktail = {
          id,
          name,
          category,
          alcohol,
          glass,
          info,
          image,
          ingredients,
        }
        setLoading(false)
        console.log(newCocktail)
        setCocktail(newCocktail)
      } else {
        setCocktail([])
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    fetchCocktail()
  }, [id, fetchCocktail])
  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  } else {
    const { name, category, alcohol, glass, info, image, ingredients } =
      cocktail
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'> {name}</h2>

        <div className='drink'>
          <img src={image} alt='cocktail' />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name:</span>
              {name}
            </p>
            <p>
              <span className='drink-data'>category:</span>
              {category}
            </p>
            <p>
              <span className='drink-data'>info:</span>
              {alcohol}
            </p>
            <p>
              <span className='drink-data'>glass:</span>
              {glass}
            </p>
            <p>
              <span className='drink-data'>instructions:</span>
              {info}
            </p>
            <p>
              <span className='drink-data'>ingredients:</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleCocktail
