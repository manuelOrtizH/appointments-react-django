import React from 'react';
import './Card.css'

const Card = ({name, description, pymes, imageUrl}) => {

    // const totalPymes = pymes.length()

    return(
        <section className='dark '>
            <div className='container py-4'>
                <article className='postcard dark blue shadow-lg'>
                    <a className='postcard__img_link' href='#'>
                        <img className='postcard__img' src={imageUrl} alt='Image Title' />
                    </a>
                    <div className='postcard__text'>
                        <h1 className='postcard__title blue'><a href='#'>{name}</a></h1>
                        <div className='postcard__subtitle small'>
                            
                            <i className='fas fa-calendar-alt mr-2'></i>
                            Disponibilidad de PyMES: 
                            
                        </div>
                        <div className='postcard__bar'></div>
                        <div className='postcard__preview-txt'>{description}</div>
                        <ul className='postcard__tagbox'>
                            <li className='tag__item'><i className='fas fa-tag mr-2'></i>Podcast</li>
                            <li className='tag__item'><i className='fas fa-clock mr-2'></i>55 mins.</li>
                            <li className='tag__item play blue'>
                                <a href='#'><i className='fas fa-play mr-2'></i>Play Episode</a>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Card;