import React, { Component } from 'react'

export class AddShow extends Component {
  state = {
    title: '',
    score: -1,
    type: 'TV',
    showProgress: 0,
    showTotal: '',
    rating: 'G',
    titleErr: '',
    totalErr: ''
  }
  
  generateDropDown = (index) => {
    let select = [];
    for (let i = 0; i <= index; i++) {
      select.push(<option value={i} key={i}>{i}</option>)
    }
    return select;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  saveShow = (e) => {
    e.preventDefault();
    let show = {
      title: this.state.title,
      score: this.state.score,
      type: this.state.type,
      showProgress: this.state.showProgress,
      showTotal: parseInt(this.state.showTotal),
      rating: this.state.rating
    }
    this.props.newShow(show);
    this.props.removeForm();
  }
  
  render() {
    return (
      <div className='FormFlexContainer'>
        <form onSubmit={this.saveShow}>
          <div className='FormDiv'>
            <label className='AddFormText'>Title: </label>
            <input type='text' name='title' style={{paddingLeft: '3px'}} placeholder='TV/Movie name...' onChange={this.onChange} required></input>
          </div>
          
          <div className='FormDiv'>
            <label className='AddFormText'>Score: </label>
            <select name='score' onChange={this.onChange}>
              <option value='-1' key='-1'>--</option>
              {this.generateDropDown(10)}
            </select>
          </div>
          
          <div className='FormDiv'>
            <label className='AddFormText'>Type: </label>
            <select name='type' onChange={this.onChange}>
              <option value='TV'>TV</option>
              <option value='Movie'>Movie</option>
            </select>
          </div>
          
          <div className='FormDiv'>
            <label className='AddFormText'>Total Episodes: </label>
            <input type='number' name='showTotal' onChange={this.onChange} style={{paddingLeft: '3px'}} placeholder='24' min='1' max='1000' required></input>
          </div>
          
          <div className='FormDiv'>
            <label className='AddFormText'>Rating: </label>
            <select name='rating' onChange={this.onChange}>
              <option value='G'>G</option>
              <option value='PG'>PG</option>
              <option value='M'>M</option>
              <option value='MA 15+'>MA 15+</option>
              <option value='R 18+'>R 18+</option>
            </select>
          </div>
          
          <div style={{ padding: '10px 0'}}>
          <button type='submit' className='AddButton' style={{float: 'left', marginLeft: '5px'}}>Save</button>

          <button className='AddButton' style={{float: 'left', marginLeft: '5px'}} onClick={this.props.removeForm}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddShow
