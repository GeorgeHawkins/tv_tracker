import React, { Component } from 'react'
import TVIndividual from './TVIndividual'
import AddShow from './AddShow'
import sortImg from '../Sort.png'

export class TVList extends Component {
  state = {
    addMode: false,
    asc: true
  }

  renderTableData = () => {
    return this.props.shows.map((show, index) => {
      return (
        <TVIndividual key={show.id} index={index} show={show} showUpdate={this.props.showUpdate} delShow={this.props.delShow}/>
      )
    })
  }

  removeForm = () => {
    this.setState({addMode: false})
  }

  sortShows = (sortby) => {
    this.props.sortShows(sortby, this.state.asc);
    this.setState({asc: !this.state.asc})
  }

  render() {
    return (
      <div>
      <div style={{ overflowX : 'auto', marginBottom: '15px'}}>
        
        <table className='Table'>
          <thead>
            <tr>
              <th style={{width: '5%'}} scope='col'>#</th>
              <th style={{width: '25%'}}scope='col'>Title<input type="image" src={sortImg} alt='Sort' className='SortButton' onClick={() => this.sortShows('title')}/></th>
              <th scope='col'>Score<input type="image" src={sortImg} alt='Sort' className='SortButton' onClick={() => this.sortShows('score')}/></th>
              <th scope='col'>Type<input type="image" src={sortImg} alt='Sort' className='SortButton' onClick={() => this.sortShows('type')}/></th>
              <th scope='col'>Progress<input type="image" src={sortImg} alt='Sort' className='SortButton' onClick={() => this.sortShows('progress')}/></th>
              <th scope='col'>Rated<input type="image" src={sortImg} alt='Sort' className='SortButton' onClick={() => this.sortShows('rated')}/></th>
              <th style={{minWidth: '65px', width: '5%', border: 'none'}} scope='col'></th>
            </tr>
          </thead>

          <tbody>
          {this.renderTableData()}
          </tbody>
          
        </table>
        
      </div>
        {!this.state.addMode ? <button className='AddButton' onClick={() => {
          this.setState({addMode: true})
        }} >Add New</button> : null}
        
        {this.state.addMode ? <AddShow removeForm={this.removeForm} newShow={this.props.newShow}/> : null}
      </div>
    )
  }
}

export default TVList
