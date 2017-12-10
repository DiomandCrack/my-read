import React,{Component} from 'react'
import '../App.css'


class BookChanger extends Component {
    render (){
        return (
            <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>移动到...</option>
              <option value="currentlyReading">最近阅读</option>
              <option value="wantToRead">心愿单</option>
              <option value="read">书单</option>
              <option value="none">不移动</option>
            </select>
          </div>
        )
    }
}

export default BookChanger