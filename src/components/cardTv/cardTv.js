import React, { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./cardTv.css"
import { Link } from "react-router-dom"

const CardTv = ({ tv }) => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return <>
    {
      isLoading
        ?
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
        :
        <Link to={`/tvDetail/${tv.id}`} style={{ textDecoration: "none", color: "white" }}>
          <div className="cards">
            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${tv.poster_path ? tv.poster_path : tv.backdrop_path}`} />
            <div className="cards__overlay">
              <div className="card__title">{tv ? tv.name : tv.original_name}</div>
              <div className="card__runtime">
                {tv ? tv.first_air_date : ""}
                <span className="card__rating">{tv ? tv.vote_average : ""}<i className="fas fa-star" /></span>
              </div>
              <div className="card__description">{tv ? tv.overview.slice(0, 118) + "..." : ""}</div>
            </div>
          </div>
        </Link>
    }
  </>
}

export default CardTv