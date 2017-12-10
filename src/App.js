import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './components/Book'
class BooksApp extends React.Component {
  state = {
    currently:{
      title:'最近阅读',
      bookList:
      [{
         url:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
         bookTitle: 'To Kill a Mockingbird',
         bookAuthor: 'Harper Lee'
      },
      {
          url:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
          bookTitle: 'To Kill a Mockingbird',
          bookAuthor: 'Harper Lee'
      }]
  },
    showSearchPage: false,
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
        this.setState({books})
        console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                
                }
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              {this.state.books.}
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>我的书架</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">
                    {this.state.currently.title}</h2>
                  <div className="bookshelf-books">
                    <Book info = {this.state.currently}/>
                  </div>
                </div>


                <div className="bookshelf">
                  <h2 className="bookshelf-title">心愿单</h2>
                  <div className="bookshelf-books">
                    <Book info = {this.state.currently}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">我的书单</h2>
                  <div className="bookshelf-books">
                      <Book info = {this.state.currently}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
