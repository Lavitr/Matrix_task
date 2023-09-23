import React from "react";

const ResultStat = ({ count, startTime }) => (
  <div className="result-stats">
    {`About ${count} results`}
    <nobr>
      {` (${Number((performance.now() - startTime) / 1000).toFixed(
        3
      )} seconds)`}
      &nbsp;
    </nobr>
  </div>
);

export default ResultStat;
