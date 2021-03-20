import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class BooksApp extends React.Component {
  state = {
    books: null
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books: books }))
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  booksOnThisShelf={this.state.books && this.state.books.filter(book => book.shelf === 'currentlyReading')}
                />
                <Bookshelf
                  title='Want to Read'
                  booksOnThisShelf={this.state.books && this.state.books.filter(book => book.shelf === 'wantToRead')}
                />
                <Bookshelf
                  title='Read'
                  booksOnThisShelf={this.state.books && this.state.books.filter(book => book.shelf === 'read')}
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                className='open-search-link'
                to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
        <Route
          path='/search'
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  className="close-search"
                  to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input type="text" placeholder="Search by title or author" />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
