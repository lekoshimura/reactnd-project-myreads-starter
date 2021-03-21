import React from 'react';

class Book extends React.Component {

  onChangeCallback = (event) => {
    const toShelf = event.target.value;
    if (toShelf === 'none') return;
    if (toShelf === this.props.book.shel) return;
    this.props.onMoveToShelf(toShelf, this.props.book);
  };

  getThumbNail = (book) => {
    return book.imageLinks.smallThumbnail 
    ? book.imageLinks.smallThumbnail 
    : 'https://via.placeholder.com/128x193.png?text=Book%20Cover'
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.getThumbNail.bind(this, book)}")` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.onChangeCallback}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
      </div>
    )
  };
};

export default Book;