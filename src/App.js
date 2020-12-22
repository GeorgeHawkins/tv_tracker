import React, { Component } from 'react';
import './App.css';
import TVList from './Components/TVList';

const showType = {
  TV: 'TV',
  MOVIE: 'Movie'
}

const ratings = {
  G: 'G',
  PG: 'PG',
  M: 'M',
  MA: 'MA 15+',
  R: 'R 18+'
}

class App extends Component {
  state = {
    shows: [
      {
        id: 1,
        title: 'Breaking Bad',
        score: 9,
        type: showType.TV,
        showProgress: 40,
        showTotal: 62,
        rating: ratings.MA
      },
      {
        id: 2,
        title: 'Prison Break',
        score: 7,
        type: showType.TV,
        showProgress: 89,
        showTotal: 90,
        rating: ratings.MA
      },
      {
        id: 3,
        title: 'Forest Gump',
        score: 10,
        type: showType.MOVIE,
        showProgress: 1,
        showTotal: 1,
        rating: ratings.M
      },
      {
        id: 4,
        title: 'The Last Dance',
        score: -1,
        type: showType.TV,
        showProgress: 0,
        showTotal: 10,
        rating: ratings.M
      }
    ]
  }

  delShow = (id) => {
    this.setState({shows: [...this.state.shows.filter(show => show.id !== id)]});
  }

  showUpdate = (showChanged) => {
    this.setState({shows: this.state.shows.map(show => {
      if (show.id === showChanged.id) {
        show = showChanged;
      }
      return show;
    })});
  }

  newShow = (showInput) => {
    const newShow = showInput
    newShow.id = (this.state.shows.length > 0 ) ? this.state.shows[this.state.shows.length-1].id + 1 : 1
    this.setState({shows: [...this.state.shows, newShow]})
  }

  sortShows = (sortby, asc) => {
    const ratingSortOrder = {
      'G' : 0,
      'PG': 1,
      'M': 2,
      'MA 15+': 3,
      'R 18+': 4
    }
    let sortedShows = this.state.shows.sort((a, b) => {
      switch (sortby) {
        case 'title':
          return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1
        case 'score':
          return (a.score < b.score) ? 1 : -1
        case 'type':
          return (a.type.toLowerCase() > b.type.toLowerCase()) ? 1 : -1
        case 'progress':
          return ((a.showProgress/a.showTotal) > ((b.showProgress/b.showTotal))) ? 1 : -1
        case 'rated':
          return (ratingSortOrder[a.rating] < ratingSortOrder[b.rating]) ? 1 : -1
        default:
          return 0;
      }
      
    });
    //flip order
    if (!asc) {
      sortedShows = sortedShows.reverse()
    }
    this.setState({shows: sortedShows})
  }

  render() {
    return (
      <div className='App'>
        <div className='Main'>
          <h1>TV Tracker</h1>
          <TVList shows={this.state.shows} showUpdate={this.showUpdate} delShow={this.delShow} newShow={this.newShow} sortShows={this.sortShows} />
        </div>
      </div>
    );
  }
  
}

export default App;
