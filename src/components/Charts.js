import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveStream } from "@nivo/stream";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const BarChart = ({ data /* see data tab */ }) => (
  <div style={{ height: 300, padding: 10 }}>
    <ResponsiveBar
      data={data}
      // keys={["hot dog"]}
      indexBy="country"
      margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
      // margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      // groupMode="grouped"
      colors={{ scheme: "nivo" }}
      radialLabelsTextColor="#999"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      theme={{
        tooltip: {
          container: {
            color: "#000",
          },
        },
      }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 58,
          itemsSpacing: 0,
          itemWidth: 50,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "top-to-bottom",
          itemOpacity: 0.85,
          symbolSize: 20,
          // symbolShape: "circle",

          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

export const PieChart = ({ data /* see data tab */ }) => (
  <div style={{ height: 300, padding: 10, overflowX: "hidden" }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.3}
      padAngle={0}
      cornerRadius={0}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#999"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      theme={{
        tooltip: {
          container: {
            color: "#000",
          },
        },
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "SOL",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "TSD",
          },
          id: "dots",
        },
        {
          match: {
            id: "FAC",
          },
          id: "lines",
        },
        {
          match: {
            id: "NRD",
          },
          id: "lines",
        },
        {
          match: {
            id: "SSD",
          },
          id: "lines",
        },
        {
          match: {
            id: "PPM",
          },
          id: "lines",
        },
      ]}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 30,
      //     itemHeight: 18,
      //     itemTextColor: "#999",

      //     itemDirection: "top-to-bottom",
      //     itemOpacity: 1,
      //     symbolSize: 4,
      //     symbolShape: "circle",

      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  </div>
);

export const StreamChart = ({ data /* see data tab */ }) => (
  <div style={{ height: 300, padding: 0 }}>
    <ResponsiveStream
      data={data}
      keys={["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"]}
      margin={{ top: 45, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      radialLabelsTextColor="#999"
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      offsetType="none"
      colors={{ scheme: "nivo" }}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      theme={{
        tooltip: {
          container: {
            color: "#000",
          },
        },
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#2c998f",
          size: 4,
          padding: 2,
          stagger: true,
        },
        {
          id: "squares",
          type: "patternSquares",
          background: "inherit",
          color: "#e4c912",
          size: 6,
          padding: 2,
          stagger: true,
        },
      ]}
      fill={[
        {
          match: {
            id: "Paul",
          },
          id: "dots",
        },
        {
          match: {
            id: "Marcel",
          },
          id: "squares",
        },
      ]}
      dotSize={8}
      dotColor={{ from: "color" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateX: 0,
          translateY: 54,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999999",
          symbolSize: 12,
          symbolShape: "circle",
          // effects: [
          //   {
          //     on: "hover",
          //     style: {
          //       itemTextColor: "#000000",
          //     },
          //   },
          // ],
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);
