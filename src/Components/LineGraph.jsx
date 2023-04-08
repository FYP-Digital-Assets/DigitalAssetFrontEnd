import React from "react";
import { Line } from "react-chartjs-2";

import { Chart } from 'chart.js/auto';
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
function LineGraph({label, xpoints, ypoints}) {
  return (
    <div>
      <Line
        data={{
          // x-axis label values
          labels: xpoints,
          datasets: [
            {
              label: label,
              // y-axis data plotting values
              data: ypoints,
              backgroundColor: "blue",
              borderColor:'green',
              responsive:true
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;