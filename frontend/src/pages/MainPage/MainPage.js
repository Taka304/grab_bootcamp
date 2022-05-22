import React from 'react'
import './MainPage.css';

function MainPage() {
  return (
      <div className='wrapper'>
          <div class="mb-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
              <div className='right addMargin'>
                  <button type="button" class="btn btn-primary">Submit</button>
              </div>
          </div>
      </div>
  )
}

export default MainPage