import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { VictoryPie } from "victory";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  chartContainer: {
    position: "relative"
  },
  chartCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  daysLeft: {
    color: theme.palette.success.main
  }
}));

type PieChartProps = {
  numberOfDaysAllowed: number;
  numberOfDaysUsed?: number;
};

const PieChart: React.FC<PieChartProps> = ({
  numberOfDaysAllowed,
  numberOfDaysUsed = 0
}) => {
  const classes = useStyles();
  const data = [
    { x: "Used", y: numberOfDaysUsed },
    { x: "Remaining", y: numberOfDaysAllowed - numberOfDaysUsed }
  ];

  const centerLabel = `${numberOfDaysAllowed - numberOfDaysUsed} days left`;

  return (
    <div className={classes.root}>
      <div className={classes.chartContainer}>
        <VictoryPie
          data={data}
          height={400}
          width={300}
          innerRadius={70}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }: { datum: any }) => {
                console.log(datum);
                return datum.x.toLowerCase() === "used" ? "#C2185B" : "#e0e0e0";
              }
            }
          }}
        />
        <div className={classes.chartCenter}>
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
