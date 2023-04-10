import React from "react";
import { Typography } from "@mui/material";
import { VictoryPie } from "victory";
import "../styles/Pie.css"

type PieChartProps = {
  numberOfDaysAllowed: number;
  numberOfDaysUsed?: number;
};

const PieChart: React.FC<PieChartProps> = ({
  numberOfDaysAllowed,
  numberOfDaysUsed = 0
}) => {
  const data = [
    { x: "Used", y: numberOfDaysUsed },
    { x: "Remaining", y: numberOfDaysAllowed - numberOfDaysUsed }
  ];

  const centerLabel = `${numberOfDaysAllowed - numberOfDaysUsed} days left`;

  return (
    <div className="root">
      <div className="chartContainer">
        <VictoryPie
          data={data}
          height={400}
          width={300}
          innerRadius={70}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }: any) => {
                return datum.x.toLowerCase() === "used" ? "#C2185B" : "#e0e0e0";
              }
            }
          }}
        />
        <div className="chartCenter">
          <Typography variant="h4">{numberOfDaysUsed}</Typography>
        </div>
      </div>
      <Typography variant="h5" color="secondary">
        {centerLabel}
      </Typography>
    </div>
  );
};

export default PieChart;
