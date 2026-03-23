import React from 'react';
import './Movies.css';
import { WatchMovies } from './WatchMovies';

const Movies = () => {

  return (

    <section className='movie_list'>
        <header className='movieheader'>
            <h2 className='center_ele movie_h2'>Popular</h2>
            <div className='center_ele movie_listadd'>
                <ul className='center_ele movie_filter'>
                    <li className='movie_filter_item'>8+</li>
                    <li className='movie_filter_item'>7+</li>
                    <li className='movie_filter_item'>6+</li>
                </ul>
            </div>
            <select name="" id="" className="movie_sorting">
                <option value="">Sort By</option>
                <option value="">Date</option>
                <option value="">Rating</option>
            </select>
            <select name="" id="" className="movie_sorting">
                <option value="">Ascending</option>
                <option value="">Decending</option>
            </select>

        </header>

        <div className='movie_shows'>
            <WatchMovies />

        </div>

    </section>


  )
}

export default Movies;
