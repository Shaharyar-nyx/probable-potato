"use client";

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

import { SemiCircleProps } from "@/types";
import { getStrapiAssetUrl } from "@/lib";

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
        <g style="text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center">
            <img
                src="${getStrapiAssetUrl(item.icon.data.attributes.url)}"
                alt="${item.icon.data.attributes.name}"
                style="width: 15px; height: 15px; margin-bottom: 2px;"
            />
            <h3
                style="font-size: 7px; font-weight: bold; color: ${hoveredIndex === index ? "#F6F7F8" : "#02255B"}; margin-bottom: 2px"
            >
                ${item.title}
            </h3>
            <p
                style="font-size: 5px; color: ${hoveredIndex === index ? "#F6F7F8" : "#02255B"}; margin: 0"
            >
                ${item.content}
            </p>
        </g>`,
    }));

    const width = 400;
    const height = 220;
    const radius = Math.min(width / 2 - 10, height - 20);
    const baseColor = "#F6F7F8";
    const innerBorderColor = "#045DE3";
    const outerBorderColor = "#EFF0F2";
    const sideBorderColor = "#EFF0F2";
    const hoverColor = "#045DE3";
    const hoverInnerBorderColor = "#B4CEF7";
    const hoverOuterBorderColor = "#B4CEF7";

    // Inner border thickness
    const innerBorderThickness = radius * 0.05;

    // Outer border thickness (half of inner border)
    const outerBorderThickness = innerBorderThickness / 2;

    const arcGenerator = d3
      .arc<d3.PieArcDatum<DataType>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius)
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

    // Draw inner border arcs
    const innerBorders = chartGroup
      .selectAll("path.inner-border")
      .data(pieData)
      .join("path")
      .attr(
        "d",
        d3
          .arc<d3.PieArcDatum<DataType>>()
          .innerRadius(radius * 0.5 - innerBorderThickness)
          .outerRadius(radius * 0.5)
          .startAngle((d) => d.startAngle)
          .endAngle((d) => d.endAngle),
      )
      .attr("fill", innerBorderColor)
      .attr("class", "inner-border");

    // Draw outer border arcs
    const outerBorders = chartGroup
      .selectAll("path.outer-border")
      .data(pieData)
      .join("path")
      .attr(
        "d",
        d3
          .arc<d3.PieArcDatum<DataType>>()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.5 + outerBorderThickness)
          .startAngle((d) => d.startAngle)
          .endAngle((d) => d.endAngle),
      )
      .attr("fill", outerBorderColor)
      .attr("class", "outer-border");

    // Draw main arcs and foreignObjects together
    const arcGroups = chartGroup
      .selectAll("g.arc-group")
      .data(pieData)
      .join("g")
      .attr("class", "arc-group")
      .on("mouseover", function (event, d) {
        setHoveredIndex(d.index); // Set hovered index
        d3.select(this).select("path.arc").attr("fill", hoverColor);
        innerBorders.filter((borderD) => borderD.index === d.index).attr("fill", hoverInnerBorderColor);
        outerBorders.filter((borderD) => borderD.index === d.index).attr("fill", hoverOuterBorderColor);
      })
      .on("mouseout", function (event, d) {
        setHoveredIndex(null); // Reset hovered index
        d3.select(this).select("path.arc").attr("fill", baseColor);
        innerBorders.filter((borderD) => borderD.index === d.index).attr("fill", innerBorderColor);
        outerBorders.filter((borderD) => borderD.index === d.index).attr("fill", outerBorderColor);
      });

    // Draw the arc paths inside the group with side borders
    arcGroups
      .append("path")
      .attr("class", "arc")
      .attr("d", arcGenerator)
      .attr("fill", baseColor)
      .attr("stroke", sideBorderColor) // Add side border color
      .attr("stroke-width", innerBorderThickness / 4); // Side border thickness: 1/4 of inner border

    // Add custom HTML labels inside each portion using foreignObject
    arcGroups
      .append("foreignObject")
      .attr("x", (d) => arcGenerator.centroid(d)[0] - 25)
      .attr("y", (d) => arcGenerator.centroid(d)[1] - 25)
      .attr("width", 50)
      .attr("height", 50)
      .html((d) => d.data.customContent);
  }, [data, hoveredIndex]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <p className="w-[290px] font-semibold text-primary-800" style={{ fontSize: "clamp(12px, 1vw, 16px) " }}>
          {text}
        </p>
      </div>
    </div>
  );
};
