import React, {useEffect, useState} from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/MovieRow'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

export default function App(){
  const [movieList, setMovieList] = useState()
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  useEffect(() => {
    const loadAll = async () =>{
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)
      setRemoveLoading(true)
      
      //Pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      //sorteando um valor entre os originals
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
    }
    setTimeout(() => {
      loadAll()
    }, 2000)
  }, [])
  useEffect(() =>{
    const scrolListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrolListener)

    return () => {
        window.removeEventListener('scroll', scrolListener)
    }
  }, [])
  return(
    <div className='page'>
      <Header black = {blackHeader}/>
      {featuredData && 
        <FeaturedMovie item = {featuredData}/>
      }
      <section className='lists'>
        {movieList?.map((item, key) => {
          return(
            <div>
              <MovieRow key = {key} title = {item.title} items = {item.items}/>
            </div>
          )
        })}
        {!removeLoading && <Loading />}
      </section>
      <Footer />
      
    </div>
  )
}