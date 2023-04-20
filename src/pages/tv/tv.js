import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import CardTv from '../../components/cardTv/cardTv'
import "./tv.css"
import 'swiper/swiper.min.css'

const Tv = () => {
  const [tv, setTv] = useState([])
  const [trending, setTrending] = useState([])
  const [today, setToday] = useState([])
  const [broadcast, setBroadcast] = useState([])

  useEffect(() => {
    television()
    popular()
    airing()
    onAir()
  }, [])

  const television = () => {
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Math.floor(Math.random() * 100) + 1}`)
      .then(res => res.json())
      .then(data => setTv(data.results))
  }
  console.log({ tv: tv })

  const popular = () => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Math.floor(Math.random() * 100) + 1}`)
      .then(res => res.json())
      .then(data => setTrending(data.results))
  }

  console.log({ trending: trending })

  const airing = () => {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Math.floor(Math.random() * 15) + 1}`)
      .then(res => res.json())
      .then(data => setToday(data.results))
  }

  console.log({ today: today })

  const onAir = () => {
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${Math.floor(Math.random() * 50) + 1}`)
      .then(res => res.json())
      .then(data => setBroadcast(data.results))
  }

  console.log({ broadcast: broadcast })

  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {
          tv.map(tv => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/tvDetail/${tv.id}`} >
              <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${tv.backdrop_path ? tv.backdrop_path : tv.poster_path}`} />
              </div>
              <div className="posterImage__overlay_tv">
                <div className="posterImage__title_tv">{tv.name ? tv.name : tv.original_name}</div>
                <div className="posterImage__runtime_tv">
                  {tv ? tv.first_air_date : ""}
                  <span className="posterImage__rating_tv">
                    {tv ? tv.vote_average : ""}
                    <i className="fas fa-star_tv" />{" "}
                  </span>
                </div>
                <div className="posterImage__description_tv">{tv ? tv.overview : ""}</div>
              </div>
            </Link>
          ))
        }
      </Carousel>
      <div className="movie__list">
        <h2 className="list__title">TOP RATED</h2>
        <div className="list__cards">
          <Swiper
            grabCursor={true}
            spaceBetween={100}
            slidesPerView={7}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preventClicks={true}
            slideToClickedSlide={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
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
              tv?.map((tv, i) => (
                <SwiperSlide key={i}>
                  <CardTv tv={tv} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="movie__list">
        <h2 className="list__title">TRENDING</h2>
        <div className="list__cards">
          <Swiper
            grabCursor={true}
            spaceBetween={80}
            slidesPerView={7}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preventClicks={true}
            slideToClickedSlide={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
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
              trending?.map((tv, i) => (
                <SwiperSlide key={i}>
                  <CardTv tv={tv} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="movie__list">
        <h2 className="list__title">TV Airing Today</h2>
        <div className="list__cards">
          <Swiper
            grabCursor={true}
            spaceBetween={80}
            slidesPerView={7}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preventClicks={true}
            slideToClickedSlide={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
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
              today?.map((tv, i) => (
                <SwiperSlide key={i}>
                  <CardTv tv={tv} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className="movie__list">
        <h2 className="list__title">TV Broadcast</h2>
        <div className="list__cards">
          <Swiper
            grabCursor={true}
            spaceBetween={80}
            slidesPerView={7}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preventClicks={true}
            slideToClickedSlide={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
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
              broadcast?.map((tv, i) => (
                <SwiperSlide key={i}>
                  <CardTv tv={tv} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Tv