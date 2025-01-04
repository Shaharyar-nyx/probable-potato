"use client";

import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface DataType {
  customContent: string;
  label: string;
  value: number;
}

export const SemiCircle: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data = [
      { label: "A", value: 33, customContent: '<div style="color: red;">A</div>' },
      { label: "B", value: 33, customContent: '<div style="color: blue;">B</div>' },
      { label: "C", value: 33, customContent: '<div style="color: green;">C</div>' },
    ];

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

    const pieData = pieGenerator(data);

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
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", baseColor);
        innerBorders.filter((borderD) => borderD.index === d.index).attr("fill", innerBorderColor);
        outerBorders.filter((borderD) => borderD.index === d.index).attr("fill", outerBorderColor);
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
  }, []);

  return <svg ref={svgRef} />;
};
