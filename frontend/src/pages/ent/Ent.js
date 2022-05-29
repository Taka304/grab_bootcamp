import React, { useState } from "react";
import { TokenAnnotator } from "react-text-annotate";
import './Ent.css'

const TAG_COLORS = {
  ORG: "#44c5cb",
  PER: "#fce315",
  LOC: "#f53d52",
  MISC: "#ff9200",
};

export default function AnnotatorCard({ children }) {
  const tags = [
    { id: "ORG", label: "ORGANIZATION", color: "#44c5cb" },
    { id: "PER", label: "PERSON", color: "#fce315" },
    { id: "LOC", label: "LOCATION", color: "#f53d52" },
    { id: "MISC", label: "MISCELLANEOUS", color: "#ff9200" }
  ];
  const TEXT =
    "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";

  const [state, setState] = useState([
    {
      start: 1,
      end: 3,
      tag: "PER",
      color: "#fce315"
    },
    {
      start: 9,
      end: 10,
      tag: "ORG",
      color: "#44c5cb"
    },
    {
      start: 11,
      end: 12,
      tag: "MISC",
      color: "#ff9200"
    }
  ]);
  const [tag, setTag] = useState("PER");

  const handleChange = (value) => {
    setState(value);
  };

  const countTag = (label) => {
    return state.filter((tagWord) => tagWord.tag === label).length;
  }

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
        class="tags-block"
        style={{
          background: props.color
        }}
      >
        {props.content}{" "}
        <span class="ent-Name">{" "}{props.tag}</span>
      </mark>
    );
  };
  return (
    <div className=" d-flex flex-column p-2 ">
      <div className="d-flex flex-row bg-lightgreen">
        {tags.map((tag_) => (
          <button
            class={` btn addMargin btn-${tag === tag_.id
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
      <div className='right addMargin'>
        <button type="button" class="btn btn-primary">Update</button>
      </div>
      {/* <div class="card">
        <div class="card-body">
          <h4>Output Value</h4>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div> */}
    </div>
  );
}
