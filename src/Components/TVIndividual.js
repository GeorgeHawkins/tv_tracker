import React, { Component } from 'react'
import editImg from '../Edit.png'
import deleteImg from '../Delete.png'
import saveImg from '../Save.png'
import cancelImg from '../Cancel.png'

export class TVIndividual extends Component {
  state = {
    editMode: false,
    id: this.props.show.id,
    title: this.props.show.title,
    score: this.props.show.score,
    type: this.props.show.type,
    showProgress: this.props.show.showProgress,
    showTotal: this.props.show.showTotal,
    rating: this.props.show.rating
  }

  checkStarted = () => {
    return (this.props.show.score === -1) ? '--' : this.props.show.score + '/10'
  }

  generateDropDown = (index) => {
    let select = [];
    for (let i = 0; i <= index; i++) {
      select.push(<option value={i} key={i}>{i}</option>)
    }
    return select;
  }

  onChange = (e) => {
    if (e.target.value !== '') {
      this.setState({ [e.target.name]: e.target.value})
    } 
  }
  saveUpdates = () => {
    const show = {
      id: this.props.show.id,
      title: this.state.title,
      score: this.state.score,
      type: this.state.type,
      showProgress: this.state.showProgress,
      showTotal: this.state.showTotal,
      rating: this.state.rating
    }
    this.props.showUpdate(show);
    this.setState({editMode: false});
  }

  render() {
    const {id, title, score, type, showProgress, showTotal, rating} = this.props.show
    const percentComplete = Math.round(showProgress/showTotal * 100)
    return (
      <tr>
        <th>{this.props.index + 1}</th>
        <td style={{ textAlign: 'left' }}>
          {!this.state.editMode ? title : null}
          {this.state.editMode ? <input type='text' defaultValue={title} name='title' onBlur={this.onChange}></input> : null }
        </td>

        <td>
          {!this.state.editMode ? this.checkStarted() : null}
          {this.state.editMode ? <select name='score' defaultValue={score} onChange={this.onChange}>
          {this.generateDropDown(10)}
          </select> : null }
        </td>

        <td>
          {!this.state.editMode ? type : null}
          {this.state.editMode ? <select name='type' defaultValue={type} onChange={this.onChange}>
          <option value='TV'>TV</option>
          <option value='Movie'>Movie</option>
        </select> : null }
        </td>

        <td>
          {!this.state.editMode ? showProgress+'/'+showTotal + ' (' + percentComplete + '%)': null}
          {this.state.editMode ? <select name='showProgress' defaultValue={showProgress} onChange={this.onChange}>
          {this.generateDropDown(showTotal)}
        </select> : null}
        </td>

        <td>
          {!this.state.editMode ? rating : null}
          {this.state.editMode ? <select name='rating'defaultValue={rating} onChange={this.onChange}>
          <option value='G'>G</option>
          <option value='PG'>PG</option>
          <option value='M'>M</option>
          <option value='MA 15+'>MA 15+</option>
          <option value='R 18+'>R 18+</option>
          </select> : null}
        </td>

        <td style={{border: 'none', padding: '0.5rem 0'}}>
          
          {!this.state.editMode ? <input type="image" src={editImg} alt='Edit' className='EditButton' onClick={() => {
            this.setState({editMode: true})
          }} /> : null}

          {this.state.editMode ? <input type="image" src={saveImg} alt='Save' className='EditButton' onClick={this.saveUpdates}/> : null}

          {!this.state.editMode ? <input type="image" src={deleteImg} alt='Delete' className='EditButton' onClick={() => {
            this.props.delShow(id)
          }}/> : null}
          
          {this.state.editMode ? <input type="image" src={cancelImg} alt='Cancel' className='EditButton' onClick={() => {
            this.setState({editMode: false})
          }}/> : null}
        </td>
      </tr>
    )
  }
}

export default TVIndividual
