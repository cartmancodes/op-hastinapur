import * as React from 'react';
import { VictoryChart, VictoryBar, VictoryBrushContainer, VictoryZoomContainer } from "victory";
function BarChartWard(props) {
  const uData = props.values;
  const xLabels = props.XLabels;
  let data = [];
  for (let i = 0; i < xLabels.length; i++) {
    data.push({ x: xLabels[i], y: uData[i] });
  }
  const [zoomDomain, setZoomDomain] = React.useState([0, 100]);
  const handleZoom = (e) => {
    setZoomDomain(e);
  }
  return (
    <VictoryChart
      domainPadding={12}
      width={props.width}
      height={400}
    >
      <VictoryBar
      barRatio={2.4}
        padding={{ left: 100 }}
        style={{
          data: {
            fill: ({ datum }) => datum.y <= 1 ? '#f43f5e' :
              datum.y <= 3 ? '#fca5a5' : datum.y <= 4 ? '#86efac' : '#22c55e',

          },
          labels: { margin: 5 }
        }}
        data={data}
        barWidth={10}
        cornerRadius={4}
        animate={{
          duration: 2000,
          easing: 'bounceOut'
        }}
      />
    </VictoryChart>
  );
}
export default BarChartWard