import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends React.Component {
  state = {
    searchResult: []
  };

  onSearchChange = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length === 0) {
      this.setState({ searchResult: [] });
    } else {
      BooksAPI.search(searchTerm)
        .then(data => {
          if (data.error) {
            this.setState({ searchResult: [] })
          } else {
            this.setState({ searchResult: data })
          }
        })
    };
  };

  getShelf = (book) => {
    const bookFound = this.props.booksOnShelf.filter(item => item.id === book.id)[0];
    return bookFound && bookFound.shelf
      ? bookFound.shelf
      : 'none';
  };

  render() {
    return (
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
            <input type="text" placeholder="Search by title or author" onChange={this.onSearchChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult && this.state.searchResult.map(
              book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelf={this.getShelf(book)}
                    onMoveToShelf={this.props.onMoveToShelf.bind(this)}
                  />
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;