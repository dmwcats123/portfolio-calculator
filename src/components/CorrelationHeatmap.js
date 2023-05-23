import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Heatmap, HeatmapSeries, HeatmapAxis } from 'recharts';

const CorrelationHeatmap = ({ correlationData }) => {
  const data = Object.keys(correlationData).flatMap((company1, index1) =>
    Object.keys(correlationData[company1]).map((company2, index2) => ({
      company1,
      company2,
      value: correlationData[company1][company2],
      x: index2,
      y: index1,
    }))
  );

  const companies = Object.keys(correlationData);

  return (
    <Heatmap width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="company2" type="category" tick={false} axisLine={false} tickLine={false} />
      <YAxis dataKey="company1" type="category" tick={false} axisLine={false} tickLine={false} />
      <Tooltip />
      <HeatmapSeries
        name="Correlation"
        data={data}
        dataKey="value"
        fill="#8884d8"
        radius={[0, '80%']}
        stroke
      />
      <HeatmapAxis data={companies} axisLine={false} tickLine={false} />
    </Heatmap>
  );
};

export default CorrelationHeatmap;
