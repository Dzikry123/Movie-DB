import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import Cards from "../../components/card/card";
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper.min.css'


const Home = () => {

  const [popularMovies, setPopularMovies] = useState([])
  const [kids, setKids] = useState([])
  const [drama, setDrama] = useState([])
  const [comedy, setComedy] = useState([])
  const [tahun, setTahun] = useState([])
  const [person, setPerson] = useState([])

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
  }, [])

  useEffect(() => {
    animation()
    bestDrama()
    bestComedy()
    bestYear()
  }, [])

  const people = () => {
    fetch("https://api.themoviedb.org/3/person/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1", {
      method: 'GET',
      body: JSON.stringify(),
      credentials: "same-origin", //include, same-origin
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(data => setPerson(data.results))
  }

  console.log({ person: person })

  // ============== Date =================
  const date = new Date()
  let year = date.getFullYear()
  console.log(year);

  // ============== Next Week =================
  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  const currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate);

  const nextWeek = addDays(date, 7).toJSON().slice(0, 10);
  console.log(nextWeek)



  const bestDrama = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=4e44d9029b1270a757cddc766a1bcb63`)
      .then(res => res.json())
      .then(data => setDrama(data.results))
  }

  console.log({ drama: drama })

  const bestComedy = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=vote_average.desc&vote_count.gte=10&api_key=4e44d9029b1270a757cddc766a1bcb63`)
      .then(res => res.json())
      .then(data => setComedy(data.results))
  }

  console.log({ comedy: comedy })

  const bestYear = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=2023&sort_by=vote_average.desc&vote_count.gte=10&api_key=4e44d9029b1270a757cddc766a1bcb63`)
      .then(res => res.json())
      .then(data => setTahun(data.results))
  }

  console.log({ tahun: tahun })


  const animation = () => {
    fetch("https://api.themoviedb.org/3/discover/movie?certification_country=BG&certification.lte=A&sort_by=popularity.desc&sort_by=vote_average.desc?&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then(res => res.json())
      .then(data => setKids(data.results))
  }

  console.log({ kids: kids })


  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {
            popularMovies.map(movie => (
              <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} >
                <div className="posterImage">
                  <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}`} />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                  <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star" />{" "}
                    </span>
                  </div>
                  <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                </div>
              </Link>
            ))
          }
        </Carousel>
        {/* End Of Hero */}
        <div className="home__list_film">
          <h2 className="list__title_home">POPULAR MOVIES</h2>
          <div className="list__cards_home">
            <Swiper
              grabCursor={true}
              spaceBetween={120}
              slidesPerView={7}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              preventClicks={true}
              slideToClickedSlide={true}
              breakpoints={{
                // when window width is >= 640px
                480: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 4,
                },
                991: {
                  slidesPerView: 7,
                },
              }}
            >
              {
                popularMovies?.map((movie, i) => (
                  <SwiperSlide key={i}>
                    <Cards movie={movie} />
                  </SwiperSlide>
                ))
              }
            </Swiper>

          </div>
        </div>
        <div className="home__list_film">
          <h2 className="list__title_home">ANIMATION</h2>
          <div className="list__cards_home">
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
                kids?.map((movie, i) => (
                  <SwiperSlide key={i}>
                    <Cards movie={movie} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
        <div className="home__list_film">
          <h2 className="list__title_home">BEST DRAMA</h2>
          <div className="list__cards_home">
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
                drama?.map((movie, i) => (
                  <SwiperSlide key={i}>
                    <Cards movie={movie} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
        <div className="home__list_film">
          <h2 className="list__title_home">BEST THIS YEAR</h2>
          <div className="list__cards_home">
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
                tahun?.map((movie, i) => (
                  <SwiperSlide key={i}>
                    <Cards movie={movie} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home