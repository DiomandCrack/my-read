import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './components/Book'
import {
        BrowserRouter as Router,
        Link,
        Route
} from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    books:[],
    currently:{
      title:'最近阅读',
      bookList:
      [{
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'},
         title: 'To Kill a Mockingbird',
         authors: 'Harper Lee',
         id:1
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=BjDuAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'},
          title: 'Batman',
          authors: ['Frank Miller', 'Klaus Janson' ,'Lynn Varley'],
          id:2
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=JZwC4fjDqgIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
          title: 'Geolocation in IOS',
          authors: 'Alasdair Allan',
          id:10
      }
    ]
  },
  wantTo:{
      title:'心愿单',
      bookList:
      [{
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=ycTADgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
         title: 'Learning React',
         authors: ['Alex Banks','Eve Porcello'],
         id:3
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=274fCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
          title: 'Learning React Native',
          authors: 'Bonnie Eisenman',
          id:4
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=a_asDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
          title: 'React: Up & Running',
          authors: 'Stoyan Stefanov',
          id:5
      },
    ]
  },
  reads:{
      title:'心愿单',
      bookList:
      [{
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=jCFgCh77XMMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
         title: 'First World War Poetry',
         authors: ['Jon Silkin'],
         id:6
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=wXkg8AJilvMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'},
          title: 'The Discovery of Poetry',
          authors: 'Frances Mayes',
          id:7
      },
      {
        imageLinks:{
          thumbnail:'http://books.google.com/books/content?id=MjhaAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'},
          title: 'Continent of Mystery',
          authors: 'Stephen Thomas Knight',
          id:8
      }
    ]
  },
  query:''
  }


  componentWillMount(){
    if(localStorage.zk) this.setState(JSON.parse(localStorage.getItem('zk')))
  }

  componentDidMount(){
    BooksAPI.getAll().then(
      (books)=>{
        this.setState({books})
      }
    )
    /* localStorage.setItem('zk', JSON.stringify(this.state)) */
  }


  moveToCurrently = (book) => {
    this.setState((state)=>({
      currently:{
        title: '最近阅读',
        bookList: state.currently.bookList.concat(book)
      }
    }))
     setTimeout(()=>{
      localStorage.setItem('zk', JSON.stringify(this.state))
     },0)
  }

  moveToWantTo = (book) => {
    this.setState((state)=>({
      wantTo:{
        title: '心愿单',
        bookList: state.wantTo.bookList.concat(book)
      }
    }))
     setTimeout(()=>{
      localStorage.setItem('zk', JSON.stringify(this.state))
     },0)
  }

  moveToReads = (book) => {
    this.setState((state)=>({
      reads:{
        title: '我的书单',
        bookList: state.reads.bookList.concat(book)
      }
    }))
     setTimeout(()=>{
      localStorage.setItem('zk', JSON.stringify(this.state))
     },0)
  }

  searchBook = (query)=>{
    this.setState({query:query.trim()})
    if(this.state.query) {
      BooksAPI.search(this.state.query).then(
      (books)=>{
        this.setState({books})
      }
    )}else{
      BooksAPI.getAll().then(
      (books)=>{
        this.setState({books})
      }
    )
    }
  }


  render() {

    return (
      <Router>
      <div className="app">
          <Route path='/search' render={()=>(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to = '/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                      placeholder="搜索图书,作者"
                      value={this.state.query} 
                      onChange={(event)=>this.searchBook(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <Book info={this.state.books} 
                    currently={this.moveToCurrently}
                    want={this.moveToWantTo}
                    reads={this.moveToReads}
              />
            </div>
          </div>
        )}/>

        <Route path='/' exact render = {()=>(
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
                    <Book info={this.state.currently.bookList} 
                        currently={this.moveToCurrently}
                        want={this.moveToWantTo}
                        reads={this.moveToReads}
                    />
                  </div>
                </div>


                <div className="bookshelf">
                  <h2 className="bookshelf-title">
                    {this.state.wantTo.title}
                  </h2>
                  <div className="bookshelf-books">
                    <Book info={this.state.wantTo.bookList} 
                      currently={this.moveToCurrently}
                      want={this.moveToWantTo}
                      reads={this.moveToReads}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">我的书单</h2>
                  <div className="bookshelf-books">
                    <Book info={this.state.reads.bookList} 
                      currently={this.moveToCurrently}
                      want={this.moveToWantTo}
                      reads={this.moveToReads}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to = '/search'>Add a book</Link>
            </div>
          </div>)}/>
      </div>
      </Router>
      )
  }
}

export default BooksApp
