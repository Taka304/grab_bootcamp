import React from 'react'
import './MainPage.css';
import { useState } from "react";
import { TokenAnnotator } from "react-text-annotate";
import axios from "axios";


const TAG_COLORS = {
    ORG: "#44c5cb",
    PER: "#fce315",
    LOC: "#f53d52",
    MISC: "#ff9200",
};

export default function MainPage({ children }) {
    const [txt, setTxt] = useState()
    const [prop, setProp] = useState({
        text: '',
        predicted_text: []
    })
    // submit text and send, get response prediction and processed text and set state
    const submit = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/ner",
            data: { text: txt }
        }).then((respone) => {
            console.log("success");
            setProp({
                text: respone.data.processed_text,
                predicted_text:respone.data.predictions
            })
            setState(respone.data.predictions);
        })

    }
    // update when clicked button, must have jwt
    const update = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/histories",
            headers: {Authorization : 'Bearer ' + localStorage.getItem("token")},
            data: { 
                model_predicted: prop.predicted_text,
                user_annotated: state, 
                processed_text: prop.text
             }
        }).then((respone) => {
            alert("updated");
        })
        .catch(err => {
            alert(err);
        })
    }


    const handleInputChange = (event) => {
        setTxt(event.target.value);
    }

    // tags for new annotate text
    const tags = [
        { id: "ORG", label: "ORGANIZATION", color: "#44c5cb" },
        { id: "PER", label: "PERSON", color: "#fce315" },
        { id: "LOC", label: "LOCATION", color: "#f53d52" },
        { id: "MISC", label: "MISCELLANEOUS", color: "#ff9200" }
    ];

    // "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";

    const TEXT = prop.text
    const [state, setState] = useState([]);
    
    // auto button "Person"
    const [entity_group, setTag] = useState("PER");

    const handleChange = (value) => {
        setState(value);
    };

    // count tags after each edit
    const countTag = (label) => {
        return state.filter((tagWord) => tagWord.entity_group === label).length;
    }

    // define entities' params and style
    const AnnotatedEntity = (props) => {
        console.log(props);
        return (
            <mark
                key={props.key}
                onClick={() =>
                    props.onClick({
                        start: props.start,
                        end: props.end,
                        text: props.text,
                        entity_group: props.entity_group,
                        color: props.color
                    })
                }
                class="tags-block"
                style={{
                    background: props.color
                }}
            >{props.content}{" "}
                <span class="ent-Name">{" "}{props.entity_group}</span>
            </mark>
        );
    };


    return (
        <div className='wrapper'>
            <div className='container-fluid custom_size' />
            <div class="mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" placeholder="Input text here..." onChange={handleInputChange} ></textarea>
                <div className='right addMargin'>
                    <button type="button" class="btn btn-primary" onClick={submit}>Submit</button>
                </div>
            </div>
            <div className='center addPad' />
            <div class="container-fluid custom_size ">
                <div className=" d-flex flex-column">
                    <div className="d-flex flex-row bg-lightgreen">
                        {/* Map tags button, clicked buttons will have different style */}
                        {tags.map((tag_) => (
                            <button
                                class={` btn addMargin btn-${entity_group === tag_.id
                                    ? "light"
                                    : "outline-secondary"
                                    }`}
                                style={{ backgroundColor: tag_.color }}

                                onClick={() => setTag(tag_.id)}
                            >
                                {tag_.label}

                                <span class="badge text-bg-num addMarginLeft">{countTag(tag_.id)}</span>

                            </button >
                        ))}
                    </div>
                    <div class="card">
                        {/* split text, value will get model's entities, 
                        can be changed by click, 
                        have self define style by renderMark,
                        new tag will be updated by getSpan */}
                        <TokenAnnotator
                            class="card-body"
                            tokens={TEXT.split(" ")}
                            value={state}
                            onChange={handleChange}
                            renderMark={AnnotatedEntity}
                            getSpan={(span) => ({
                                ...span,
                                entity_group: entity_group,
                                color: TAG_COLORS[entity_group]
                            })}
                        />
                    </div>
                    <div className='right addMargin'>
                        <button type="button" class="btn btn-primary" onClick={update}>Update</button>
                    </div>
                    <div class="card">
        {/* <div class="card-body">
          <h4>Output Value</h4>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </div>
                </div>
            </div>
        </div>
    )
}

