import React, { useState, useEffect } from 'react'
import axios from "axios";
import { TokenAnnotator } from "react-text-annotate";
import './History.css';



function History() {
  const [log, setLog] = useState([])
  // get history, must have jwt
  useEffect(() => {
    async function fetchData() {
      axios.get('/histories', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      }).then((res) => {
        setLog(res.data.histories);
      }).catch((err) =>{
        alert(err.response.data.msg)
      })
    }
    fetchData()
  }, [])

  // self-define annotated entities in history
  const AnnotatedEntity = (props) => {
    console.log(props);
    return (
      <mark
        key={props.key}
        style={{
          color: props.color,
          backgroundColor: "transparent",
          paddingRight: "4px",
          paddingLeft: "0px"
        }}
      >{props.content}
      </mark>
    );
  };

  if (!log) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      <div class="col pt-4">
      {/* <h3 class="container-fluid">
        Annotation histories
      </h3> */}
      <div class='container table-responsive'>
      <h3 class="container-fluid">
        Annotation histories
      </h3>
        <table class="table sticky">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Result from model</th>
              <th scope="col">Your annotations</th>
            </tr>
          </thead>
          <tbody>
            {/* Map by json values in array */}
            {Object.values(log).map((row) => (
              <tr>
                <td >{row.time}</td>
                <td>
                  {/* annotate entity by model, cant be changed */}
                  <TokenAnnotator
                    tokens={row.processed_text.split(" ")}
                    value={row.model_predicted}
                    renderMark={AnnotatedEntity}
                  /></td>
                <td>
                   {/* annotate entity by user, cant be changed */}
                  <TokenAnnotator
                    tokens={row.processed_text.split(" ")}
                    value={row.user_annotated}
                    renderMark={AnnotatedEntity}
                  /></td>
              </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </table></div>
      </div>
      

    </div>
  )
}

export default History