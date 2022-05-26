import React, { useState } from "react";
import { TokenAnnotator } from "react-text-annotate";
import './Ent.css'

const TAG_COLORS = {
  ORG: "#00aeff",
  PER: "#3369e7",
  LOC: "#8e43e7",
  DATE: "#b84592",
  TIME: "#ff4f81",
  MONEY: "#ff6c5f",
  PERC: "#ffc168",
  FAC: "#2dde98",
  GPE: "#1cc7d0"
};

export default function AnnotatorCard({ children }) {
  const tags = [
    { id: "ORG", label: "ORGANIZATION" },
    { id: "PER", label: "PERSON" },
    { id: "LOC", label: "LOCATION" },
    { id: "DATE", label: "DATE" },
    { id: "TIME", label: "TIME" },
    { id: "MONEY", label: "MONEY" },
    { id: "PERC", label: "PERCENT" },
    { id: "FAC", label: "FACILITY" },
    { id: "GPE", label: "GPE" }
  ];
  const TEXT =
    "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";

  const [state, setState] = useState([
    {
      start: 1,
      end: 3,
      tag: "PER",
      color: "#3369e7"
    },
    {
      start: 9,
      end: 10,
      tag: "ORG",
      color: "#00aeff"
    },
    {
      start: 11,
      end: 12,
      tag: "TIME",
      color: "#ff4f81"
    }
  ]);
  const [tag, setTag] = useState("PER");

  const handleChange = (value) => {
    setState(value);
  };

  // const handleTagChange = (e) => {
  //   setTag(e.target.value);
  // };

  // const delete_ = (start) => {
  //   const n_state = state.filter((val) => val.start !== start);
  //   setState(n_state);
  // };

  // const getButtonStyles = (tag, isActive) => {
  //   return isActive
  //     ? {
  //         button: {
  //           background: "#ffffff",
  //           color: TAG_COLORS[tag]
  //         },
  //       }
  //     : {
  //         button: {
  //           borderColor: "#ffffff",
  //           color: "#ffffff"
  //         },
  //       };
  // };

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
            tag: props.tag,
            color: props.color
          })
        }
        class = "tags-block"
        style={{
          background: props.color
        }}
      >
        {props.content}{" "}
        <span class = "ent-Name">{" "}{props.tag}</span>
      </mark>
    );
  };
  return (
    <div className=" d-flex flex-column p-2 ">
      <div className="d-flex flex-row p-2 addMargin">
        {tags.map((tag_) => (
          <button 
            class={` btn addMargin btn-${tag === tag_.id
                ? "secondary"
                : "outline-secondary"
              }`}
            onClick={() => setTag(tag_.id)}
          >
            {tag_.label}
          </button >
        ))}
      </div>
      <div class="card">
        <TokenAnnotator
          class="card-body"
          tokens={TEXT.split(" ")}
          value={state}
          onChange={handleChange}
          renderMark={AnnotatedEntity}
          getSpan={(span) => ({
            ...span,
            tag: tag,
            color: TAG_COLORS[tag]
          })}
        />
      </div>
      <div class="card">
        <div class="card-body">
          <h4>Output Value</h4>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
