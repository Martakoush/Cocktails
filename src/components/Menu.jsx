'use client'

import React, { useRef, useState } from 'react'
import { allCocktails } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    
    const contentRef = useRef()
    
    const [currentIndex,setCurrentIndex] = useState(0)
    
    const totalCocktails = allCocktails.length
    
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex)
    }
    
    const getCocktailAt = (indexOffset) =>{
    
        return allCocktails[(currentIndex+indexOffset+totalCocktails) % totalCocktails]
    }
    
    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(-1)
    const nextCocktail = getCocktailAt(-1)
    
    useGSAP(()=>{
        gsap.fromTo('#title',{
            opacity:0
        },{
            opacity:1,
            duration:1,
    });
    gsap.fromTo('.cocktail',{
            opacity:0,
            xPercent:-100
        },{
            xPercent:0,
            opacity:1,
            duration:1,
            ease:"power1.inOut"})
    gsap.fromTo('.details h2' , {
            yPercent:100,
            opacity:0
        },{
            yPercent:0,
            opacity:1,
            ease:'power1.inOut'
    })
    gsap.fromTo('.details p' , {
            yPercent:100,
            opacity:0
        },{
            yPercent:0,
            opacity:1,
            ease:'power1.inOut'
    })

    },[currentIndex])
    return (
        <section id="menu" className='overflow-hidden'>
            <img src="/images/slider-left-leaf.png" alt="left-leaft" id='m-left-leaf'/>
            <img src="/images/slider-right-leaf.png" alt="right-leaft" id='m-right-leaf'/>
        
            <h2 id='menu-heading' className='sr-only'>
                Cocktials Menu
            </h2>
            <nav className='cocktail-tabs' >
                {allCocktails.map((cocktail,index) => {

                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.id} onClick={()=> goToSlide(index)} className={`${isActive ? 'text-white border-white':'text-white/50 border-white/50'}`}>
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className="content">
                <div className='arrows'>
                    <button className='flex justify-center items-center flex-col' onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="" aria-hidden="true"/>
                    </button>
                    <button className='flex justify-center items-center flex-col' onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="" aria-hidden="true"/>
                    </button>
                </div>

                <div className='cocktail'>
                    <img src={currentCocktail.image} className='object-contain' alt="" />
                </div>

                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>
                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu
