import React from 'react'
// import axios from 'axios'

const Book = (books) => {
  const { img, title, author, audio, written } = books;

  const openLink = (link) =>{
    if (link !== '') {
      window.open(link, '_blank');
    } else {
      alert('Sorry, not available')
    }
  }

  return (
    <article className='book'>
      {/* <button type='button' className={`favorite-book ${favorite ? 'selected' : 'unselected'}`} onClick={() => toggleFavorite(title)}>
      </button> */}
      <img src={img} alt='' onClick={() => openLink(written)} />
      <h1 onClick={() => openLink(written)}>{title}</h1>
      <h4>{author}</h4>
      <button type='button' className='audio' onClick={() => openLink(audio)}>
        Audio Version
      </button>
      <button type='button' className='written' onClick={() => openLink(written)}>
        Written Version
      </button>
    </article>
  )
}

export default Book