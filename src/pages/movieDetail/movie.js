import React, { useEffect, useState } from 'react'
import "./movie.css"
import { useParams } from 'react-router-dom'
import Cards from '../../components/card/card'
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper.min.css'


const Movie = () => {
  const [movieDetail, setMovieDetail] = useState()
  const [rating, setRating] = useState([])
  const [recomendations, setRecomendations] = useState([])

  const { id } = useParams()

  useEffect(() => {
    getData()
    similiar()
    window.scroll(0, 0)
  }, [])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieDetail(data))
  }

  console.log({ movieDetail: movieDetail })

  const similiar = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setRecomendations(data.results))
  }

  console.log({ recomendations: recomendations })

  const certification = () => {
    fetch(`https://api.themoviedb.org/3/certification/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63`)
      .then(res => res.json())
      .then(data => setRating(data))
  }

  return (
    <div className="movie">
      <div className="movie__intro">
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.backdrop_path : ""}`} alt="" />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.poster_path : ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className='movie__detailRightTop'>
            <div className="movie__name">
              {movieDetail ? movieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {movieDetail ? movieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {movieDetail ? movieDetail.vote_average : ""}
              <i className='fas fa-star' />
              <span className="movie__voteCount">
                {movieDetail ? "(" + movieDetail.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {movieDetail ? movieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {movieDetail ? "Release date: " + movieDetail.release_date : ""}
            </div>
            <div className="movie__genres">
              {
                movieDetail && movieDetail.genres ?
                  movieDetail.genres.map(genre => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                  :
                  ""
              }
            </div>
          </div>
          <div className='movie__detailRightBottom'>
            <div className="synopsisText">Synopsis</div>
            <div className='movie__overview'>{movieDetail ? movieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__list_film">
        <h2 className="list__title_movie">SIMILIAR MOVIES</h2>
        <div className="list__cards_film">
          <Swiper
            grabCursor={true}
            spaceBetween={100}
            slidesPerView={7}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 700,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 7,
              },
            }}
          >
            SIMILIAR MOVIES
            {
              recomendations?.map((movie, i) => (
                <SwiperSlide key={i}>
                  <Cards movie={movie} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="movie__links_movie">
        <div className='movie__heading'>Useful Links</div>
        {
          movieDetail && movieDetail.homepage && <a href={movieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
        }
        {
          movieDetail && movieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + movieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
        }
      </div>
      <div className="movie__heading_2">Production Companies</div>
      <div className="movie__production">
        {
          movieDetail && movieDetail.production_companies && movieDetail.production_companies.map(company => (
            <>
              {
                company.logo_path
                &&
                <span className="productionCompanyImage">
                  <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt="" />
                  <span>{company.name}</span>
                </span>
              }
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Movie