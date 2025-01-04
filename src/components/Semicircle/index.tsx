"use client";

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

import { SemiCircleProps } from "@/types";

interface DataType {
  customContent: string;
  value: number;
}

export const SemiCircle: React.FC<SemiCircleProps> = ({ text, data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered index

  useEffect(() => {
    const value = 100 / data.length;
    const renderedData = data.map((item, index) => ({
      value,
      customContent: `
        <div style="text-align: center;">
            <img src="${hoveredIndex === index ? item.icon_light : item.icon_dark}" alt="${item.title}" style="width: 15px; height: 15px; margin-bottom: 2px;" />
            <h3 style="font-size: 7px; font-weight: bold; color: ${
              hoveredIndex === index ? "#F6F7F8" : "#02255B"
            }; margin-bottom: 2px">${item.title}</h3>
        </div>`,
    }));

    const width = 400;
    const height = 220;
    const radius = Math.min(width / 2 - 10, height - 20);
    const baseColor = "#F6F7F8";
    const innerBorderColor = "#045DE3";
    const outerBorderColor = "#EFF0F2";
    const backgroundColor = "#EFF0F2"; // Background color for the doughnut
    const hoverColor = "#045DE3";
    const hoverInnerBorderColor = "#B4CEF7";
    const hoverOuterBorderColor = "#B4CEF7";

    // Inner border thickness
    const innerBorderThickness = radius * 0.05; // 5% of the radius

    // Outer border thickness (half of inner border)
    const outerBorderThickness = innerBorderThickness / 2;

    const arcGenerator = d3
      .arc<d3.PieArcDatum<DataType>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .padAngle(0.02)
      .padRadius(50)
      .cornerRadius(5);

    const innerBorderArcGenerator = d3
      .arc<d3.PieArcDatum<DataType>>()
      .innerRadius(radius * 0.6 - innerBorderThickness) // Inner radius minus thickness
      .outerRadius(radius * 0.6)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .padAngle(0.02)
      .padRadius(50)
      .cornerRadius(5);

    const outerBorderArcGenerator = d3
      .arc<d3.PieArcDatum<DataType>>()
      .innerRadius(radius) // Outer radius of main arc
      .outerRadius(radius + outerBorderThickness) // Outer border half as thick as inner border
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .padAngle(0.02)
      .padRadius(50)
      .cornerRadius(5);

    const pieGenerator = d3
      .pie<DataType>()
      .value((d) => d.value)
      .startAngle(Math.PI / 2)
      .endAngle((3 * Math.PI) / 2)
      .sort(null);

    const pieData = pieGenerator(renderedData);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const chartGroup = svg
      .attr("viewBox", `0 0 ${width} ${height}`) // Responsive viewBox
      .attr("width", "100%") // Responsive width
      .attr("height", "100%") // Responsive height
      .attr("preserveAspectRatio", "xMidYMin meet") // Keep centered horizontally
      .append("g")
      .attr("transform", `translate(${width / 2}, 10)`); // Center the semi-circle

    // Draw background doughnut
    chartGroup
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius * 0.6 - innerBorderThickness) // Same as inner border's inner radius
          .outerRadius(radius) // Same as main arc's outer radius
          .startAngle(Math.PI / 2)
          .endAngle((3 * Math.PI) / 2),
      )
      .attr("fill", backgroundColor)
      .attr("class", "doughnut-background");

    // Draw inner border arcs
    const innerBorders = chartGroup
      .selectAll("path.inner-border")
      .data(pieData)
      .join("path")
      .attr("d", innerBorderArcGenerator)
      .attr("fill", innerBorderColor)
      .attr("class", "inner-border");

    // Draw main arcs
    const mainArcs = chartGroup
      .selectAll("path.arc")
      .data(pieData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", baseColor)
      .attr("class", "arc");

    // Draw outer border arcs
    const outerBorders = chartGroup
      .selectAll("path.outer-border")
      .data(pieData)
      .join("path")
      .attr("d", outerBorderArcGenerator)
      .attr("fill", outerBorderColor)
      .attr("class", "outer-border");

    // Add hover effect to arcs and borders
    mainArcs
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", hoverColor);
        innerBorders.filter((borderD) => borderD.index === d.index).attr("fill", hoverInnerBorderColor);
        outerBorders.filter((borderD) => borderD.index === d.index).attr("fill", hoverOuterBorderColor);
        setHoveredIndex(d.index); // Set hovered index
        d3.select(this).attr("fill", hoverColor);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", baseColor);
        innerBorders.filter((borderD) => borderD.index === d.index).attr("fill", innerBorderColor);
        outerBorders.filter((borderD) => borderD.index === d.index).attr("fill", outerBorderColor);
        setHoveredIndex(null); // Reset hovered index
        d3.select(this).attr("fill", baseColor);
      });

    // Add custom HTML labels inside each portion using foreignObject
    chartGroup
      .selectAll("foreignObject")
      .data(pieData)
      .join("foreignObject")
      .attr("x", (d) => arcGenerator.centroid(d)[0] - 20)
      .attr("y", (d) => arcGenerator.centroid(d)[1] - 10)
      .attr("width", 40)
      .attr("height", 20)
      .html((d) => d.data.customContent);
  }, [data, hoveredIndex]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
      <div
        style={{
          position: "absolute",
          top: "25%", // 25% down from the top
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <p className="paragraph-md w-[290px] font-semibold text-primary-800">{text}</p>
      </div>
    </div>
  );
};
