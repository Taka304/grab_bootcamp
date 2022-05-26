import React from 'react'
import './MainPage.css';

function MainPage() {
  return (
      <div className='wrapper'>
          <div className='center addMargin' />
          <div class="mb-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
              <div className='right addMargin'>
                  <button type="button" class="btn btn-primary">Submit</button>
              </div>
          </div>
          <div className='center addPad' />
          <div class="container-fluid custom_size bg-lightgreen">
              <button type="button" class="btn custom-button org">
                  Organization <span class="badge text-bg-num">4</span>
              </button>
              
          </div>
          <div className='right addMargin'>
              <button type="button" class="btn btn-primary">Update</button>
          </div>
      </div>
  )
}

export default MainPage
