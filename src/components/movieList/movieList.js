import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {

  const [movieList, setMovieList] = useState([])
  const { type } = useParams()
  const { day } = useParams()

  useEffect(() => {
    getData()
    getTrending()
  }, [])

  useEffect(() => {
    getData()
  }, [type])

  useEffect(() => {
    getTrending()
  }, [day])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Math.floor(Math.random() * 100) + 1}`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
  }

  const getTrending = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/${day ? day : "all"}?&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
  }



  console.log({ movieList: movieList })

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : `${day ? "TRENDING" : "Soon"}`).toUpperCase()}</h2>
      <div className="list__cards">
        {
          movieList?.map(movie => (
            <Cards movie={movie} />
          ))
        }
      </div>
    </div>
  )
}

export default MovieList