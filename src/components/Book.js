import React,{Component} from 'react'
import '../App.css'
import BookChanger from './BookChanger'

class Book extends Component {

     

    render(){
        {console.log(this.props.info)}

        return (
            <ol className="books-grid">
        {this.props.info.map((book)=>
            (
            <li key = {book.id}>
             <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
            </div>
            <BookChanger list = {this.props.info} 
                        currently={this.props.currently}
                        want={this.props.want}
                        reads={this.props.reads}
                        book={book}
            
            />
          </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>    
        ))}
        </ol>
        )
    }
}

export default Book