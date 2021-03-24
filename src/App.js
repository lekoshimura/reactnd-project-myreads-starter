import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: null
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books: books }));
  };

  onMoveToShelf = (toShelf, book) => {
    let items = [...this.state.books];
    let index = this.state.books.findIndex(item => item.id === book.id);
    let item;
    if (index === -1) {
      // is adding
      item = book;
      items.push(book);
    } else {
      // is moving
      item = { ...items[index] };
    }
    if (toShelf === 'none') {
      items.splice(index, 1)
    } else {
      item.shelf = toShelf;
      items[index] = item;
    }
    this.setState({ books: items });
    BooksAPI.update(book, toShelf);
  };

  render() {
    // console.log('state', this.state.books)
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
                  onMoveToShelf={this.onMoveToShelf}
                />
                <Bookshelf
                  title='Want to Read'
                  booksOnThisShelf={this.state.books && this.state.books.filter(book => book.shelf === 'wantToRead')}
                  onMoveToShelf={this.onMoveToShelf}
                />
                <Bookshelf
                  title='Read'
                  booksOnThisShelf={this.state.books && this.state.books.filter(book => book.shelf === 'read')}
                  onMoveToShelf={this.onMoveToShelf}
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
            <SearchBooks
              booksOnShelf={this.state.books}
              onMoveToShelf={this.onMoveToShelf} />
          )} />
      </div>
    )
  }
}

export default BooksApp;