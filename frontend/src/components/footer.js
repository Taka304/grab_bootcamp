import React from 'react';
import './footer.css'
import lam from '../images/lam.png'
import hieu from '../images/hieu.jpg'
import hung from '../images/hung.jpg'


function Footer() {
    return (
      <footer className="footer">
        <span class="team_info">Team[info]</span>
        <div className='group_icon'>
          <div class="row">
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={hieu} width="35" height="35" />
            </div>
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={lam} width="35" height="35" />
            </div>
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={hung} width="35" height="35" />
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer