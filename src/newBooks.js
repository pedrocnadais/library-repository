import { useState } from "react";
import { client } from "./axios.config";

const NewBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [listBooks, setListBooks] = useState([]);

  const saveToLocalStorage = (bookSuggestions, favorites) => {
    localStorage.setItem('bookSuggestions', JSON.stringify(bookSuggestions));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && author) {
      try {
        const response = await client.post('/api/suggestion', {
          title: title,
          author: author
        });
        console.log('Book added successfully:', response.data);
        setListBooks(prevListBooks => [...prevListBooks, response.data]);
        saveToLocalStorage([...listBooks, response.data]);
        setAuthor('');
        setTitle('');
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
  }
  // clear local storage
  // localStorage.clear();

  return (
    <>
      <h2 className="suggestions-title">Book Suggestions</h2>
      <article>
        <form className="suggestions-form" onSubmit={handleSubmit}>
          <div className="form-control-name">
            <label htmlFor="bookName">Book Title: </label>
            <input
              type="text"
              id="bookName"
              className="book-name-input"
              name="bookName"
              value={title}
              placeholder="book title here"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-control-author'>
            <label htmlFor='bookAuthor'>Author: </label>
            <input
              type='text'
              id='bookAuthor'
              className="book-author-input"
              name='bookAuthor'
              value={author}
              placeholder="book author here"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <button type='submit' className="submit-btn">Add book to the list</button>
        </form>
        {listBooks.map((finalBook, index) => {
          return (
            <div className="item" key={`${finalBook.title}-${index}`}>
              <h4>{finalBook.title}</h4>
              <p>{finalBook.author}</p>
            </div>
          )
        })}
      </article>
    </>
  )
}

export default NewBooks;