import React, { useEffect, useState } from 'react'
import "./tvDetail.css"
import { useParams } from 'react-router-dom'
import CardTv from '../../components/cardTv/cardTv'
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper.min.css'


const TvDetail = () => {
  const [tvDetail, setTvDetail] = useState([])
  const [rating, setRating] = useState([])
  const [recomendations, setRecomendation] = useState()

  const { id } = useParams()

  useEffect(() => {
    getData()
    similiar()
    window.scroll(0, 0)
  }, [])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setTvDetail(data))
  }

  console.log({ tvDetail: tvDetail })

  const similiar = () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setRecomendation(data.results))
  }

  console.log({ recomendations: recomendations })

  const certification = () => {
    fetch(`https://api.themoviedb.org/3/certification/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63`)
      .then(res => res.json())
      .then(data => setRating(data))
  }

  return (
    <div className="tv">
      <div className="tv__intro">
        <img className="tv__backdrop" src={`https://image.tmdb.org/t/p/original${tvDetail.backdrop_path ? tvDetail.backdrop_path : tvDetail.poster_path}`} alt="" />
      </div>
      <div className="tv__detail">
        <div className="tv__detailLeft">
          <div className="tv__posterBox">
            <img className="tv__poster" src={`https://image.tmdb.org/t/p/original${tvDetail.poster_path ? tvDetail.poster_path : tvDetail.backdrop_path}`} />
          </div>
        </div>
        <div className="tv__detailRight">
          <div className='tv__detailRightTop'>
            <div className="tv__name">
              {tvDetail.name ? tvDetail?.name : tvDetail.original_name}
            </div>
            <div className="tv__tagline">
              {tvDetail ? tvDetail.tagline : ""}
            </div>
            <div className="tv__rating">
              {tvDetail ? tvDetail.vote_average : ""}
              <i className='fas fa-star' />
              <span className="tv__voteCount">
                {tvDetail ? "(" + tvDetail.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="tv__runtime">
              {tvDetail ? tvDetail.episode_run_time + " mins per eps" : ""}
              <br />
              <div>
                {tvDetail ? tvDetail.number_of_episodes + " eps, " : " "}
                {tvDetail ? tvDetail.number_of_seasons + " seasons" : ""}
                <br />
                {tvDetail.created_by?.[0]?.name ? "Created By :" + tvDetail.created_by?.[0]?.name : "Creted by : Unknown"}
              </div>
              <br />
              <span> Status : {tvDetail ? tvDetail.status : ""}</span>

            </div>
            <div className="tv__releaseDate">
              {tvDetail ? "Release date: " + tvDetail.first_air_date : ""}
            </div>
            <div className="tv__genres">
              {
                tvDetail && tvDetail.genres ?
                  tvDetail.genres.map(genre => (
                    <>
                      <span className="tv__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                  :
                  ""
              }
            </div>
          </div>
          <div className='tv__detailRightBottom'>
            <div className="synopsisText">Synopsis</div>
            <div>{tvDetail ? tvDetail.overview : ""}</div>
          </div>

        </div>
      </div>
      <div className="tv__list_film">
        <h2 className="list__title_tv">SIMILIAR TV SHOWS</h2>
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
            {
              recomendations?.map((tv, i) => (
                <SwiperSlide key={i}>
                  <CardTv tv={tv} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="tv__links">
        <div className='tv__heading'>Useful Links</div>
        {
          tvDetail && tvDetail.homepage && <a href={tvDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="tv__homeButton tv__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
        }
        {
          tvDetail && tvDetail.imdb_id && <a href={"https://www.imdb.com/title/" + tvDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="tv__imdbButton tv__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
        }
      </div>
      <div className="tv__heading_2">Production Companies</div>
      <div className="tv__production">
        {
          tvDetail && tvDetail.production_companies && tvDetail.production_companies.map(company => (
            <>
              {
                company.logo_path
                &&
                <span className="productionCompanyImage">
                  <img className="tv__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt="" />
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

export default TvDetail