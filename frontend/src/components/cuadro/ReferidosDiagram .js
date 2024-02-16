import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ReferidosDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 100;
    const circleRadius = 20;
    const circleSpacing = 40;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const data = [
      4,
      2,
      1,
      1,
      2,
      4, // Números de círculos en cada fila
    ];

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.sum(data) - 1])
      .range([circleRadius, width - circleRadius]);

    const y = height / 2;

    // Crear círculos
    svg
      .selectAll("circle.node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", y)
      .attr("r", circleRadius);
  }, []);

  return <svg ref={svgRef} />;
};

export default ReferidosDiagram;
