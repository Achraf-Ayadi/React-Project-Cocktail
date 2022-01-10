import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const { drinks } = data

      if (drinks) {
        const newCocktails = drinks.map((cocktail) => {
          const { idDrink, strDrinkThumb, strDrink, strGlass, strAlcoholic } =
            cocktail

          return {
            id: idDrink,
            image: strDrinkThumb,
            name: strDrink,
            glas: strGlass,
            alcohol: strAlcoholic,
          }
        })

        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])
  console.log("hello")
  useEffect(() => {
    fetchData()
  }, [searchTerm, fetchData])

  return (
    <AppContext.Provider
      value={{
        loading,
        setSearchTerm,
        cocktails,
        setCocktails,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
