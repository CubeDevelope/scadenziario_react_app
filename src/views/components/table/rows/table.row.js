import { useRef, useState } from "react";
import "./table.row.css";

export function TableRow({ children, className, id, leading, tailing, title }) {
  const [rowState, changeState] = useState(false);

  const parentHeight = useRef();

  function buildClassName() {
    return "tableRow " + className;
  }

  return (
    <div id={id} className={buildClassName()}>
      <div className="mobile_tile">
        <div className="table_tile" onClick={() => changeState(!rowState)}>
          <div style={{ display: "table" }}>
            {title}
            <br/>
            <h5>{leading}</h5>
          </div>
          {tailing}
        </div>
        <div
          className="info_tile"
          ref={parentHeight}
          style={{
            height: rowState
              ? parentHeight.current.scrollHeight + 16 + "px"
              : "0",
            padding: rowState ? "8px" : "0",
          }}
        >
          {children}
        </div>
      </div>
      <div className="desktop_tile">
        <div className="table_tile">
          {leading}
          {title}
          {children}
          {tailing}
        </div>
      </div>
    </div>
  );

  if (window.innerWidth <= 650) {
    return (
      <div id={id} className={buildClassName()}>
        <div className="table_tile" onClick={() => changeState(!rowState)}>
          {leading}
        </div>
        <div
          className="info_tile"
          ref={parentHeight}
          style={{
            height: rowState ? parentHeight.current.scrollHeight + "px" : "0",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="tableRow">
      <div className="table_tile">
        {leading}
        {children}
      </div>
    </div>
  );

  return (
    <tr id={id} className={buildClassName()}>
      {children}
    </tr>
  );
}
