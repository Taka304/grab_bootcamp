import React from 'react';
import './footer.css'
import tmp_icon from '../images/tmp_icon.jpg'
import lam from '../images/lam.png'


function Footer() {
    return (
      <footer className="footer">
        <span class="team_info">Team[info]</span>
        <div className='group_icon'>
          <div class="row">
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={lam} width="35" height="35" />
            </div>
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={tmp_icon} width="35" height="35" />
            </div>
            <div class="col-md-4">
              <img class="rounded-circle" alt="" src={tmp_icon} width="35" height="35" />
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer