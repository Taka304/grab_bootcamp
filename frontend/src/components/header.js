import React, { useEffect,useState } from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import grab from '../images/grab-2.svg'
import axios from "axios";

// const init = () =>{
//     axios.get('/histories',{
//       headers: {
//           Authorization : 'Bearer ' + localStorage.getItem("token")
//         }
//     }).then((res)=>{
//         console.log(res)
//     })
// }
function Header(props) {

    const handleSignOut = () => {
        // Cookies.remove('id');
        // Cookies.remove('isAdmin');
        localStorage.clear()
        // alert("Signed Out Completed!");
        window.location.href = "/login";
      }
      const [log,setLog]=useState()
      useEffect(() =>{
        async function fetchName(){
          axios.get('/histories',{
            headers: {Authorization : 'Bearer ' + localStorage.getItem("token")}
        
          }).then((res)=>{
            setLog(res.data.username);
            console.log(log);
          })
        }
        fetchName()
        },[])
        if(!log) {
            return(
                <nav class="navbar bg-green">
            <a class="navbar-brand-logo" href="/">
                <img src={grab} alt="logo" width="60" height="54" />
            </a>
            <span class="navbar-brand-title">Bootcamp - NER</span>
            <Link to="/login">
                <button class="btn btn-outline-success-signin" type="button" >Sign In</button>
            </Link>
            <Link to="/signup">
                <button class="btn btn-outline-success-signup" type="button" href="/signup">Sign Up</button>
            </Link>
        </nav>
            )
          }
    return (
        <nav class="navbar bg-green">
            <a class="navbar-brand-logo" href="/">
                <img src={grab} alt="logo" width="60" height="54" />
            </a>
            <span class="navbar-brand-title">Bootcamp - NER</span>
            <Link to="/history">
                <button class="btn btn-outline-success-signin" type="button" >{log}</button>
            </Link>
            <Link to="/login">
                <button class="btn btn-outline-success-signup" type="button" onClick={handleSignOut}>Log Out</button>
            </Link>
        </nav>
    )
}

export default Header


// class Header extends Component {
//     componentDidMount = () =>{
//         axios.get('/histories',{
//             headers: {
//                 Authorization : 'Bearer ' + localStorage.getItem("token")
//               }
//           }).then((res)=>{
//               console.log(res.username)
//               this.setState({
//                   user: res.username
//               })
//           })
//     }
//     render(){
//         if(this.state.user){
//             return(
//                 <nav class="navbar bg-green">
//                 <a class="navbar-brand-logo" href="/">
//                     <img src={grab} alt="logo" width="60" height="54" />
//                 </a>
//                 <span class="navbar-brand-title">Bootcamp - NER</span>
//                 {/* <Link to="/login"> */}
//                     <button class="btn btn-outline-success-signin" type="button" >....</button>
//                 {/* </Link> */}
//                 <Link to="/signup">
//                     <button class="btn btn-outline-success-signup" type="button" href="/signup">Sign Up</button>
//                 </Link>
//             </nav>
//             )
//         }
//         return (
//             <nav class="navbar bg-green">
//                 <a class="navbar-brand-logo" href="/">
//                     <img src={grab} alt="logo" width="60" height="54" />
//                 </a>
//                 <span class="navbar-brand-title">Bootcamp - NER</span>
//                 <Link to="/login">
//                     <button class="btn btn-outline-success-signin" type="button" >Sign In</button>
//                 </Link>
//                 <Link to="/signup">
//                     <button class="btn btn-outline-success-signup" type="button" href="/signup">Sign Up</button>
//                 </Link>
//             </nav>
//         )
//     }
// }

// export default Header