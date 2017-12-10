import React,{Component} from 'react'
import '../App.css'
import BookChanger from './BookChanger'

class Book extends Component {

     

    render(){
        {console.log(this.props.info)}

        return (
            <ol className="books-grid">
        {this.props.info.bookList.map((book)=>(
            <li>
             <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.url})` }}>
            </div>
            <BookChanger />
          </div>
            <div className="book-title">{book.bookTitle}</div>
            <div className="book-authors">{book.bookAuthor}</div>
          </div>
        </li>    
        ))}
        </ol>
        )
    }
}

export default Book