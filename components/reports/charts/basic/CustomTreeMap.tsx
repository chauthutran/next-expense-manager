import { JSONObject } from '@/libs/definations';
import { formatCurrency } from '@/libs/utils';
import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

// Custom content component
const CustomizedContent: React.FC<any> = ({
    x,
    y,
    width,
    height,
    name,
    fill
}) => {
    if (width <= 0 || height <= 0) return null; // prevent zero-size rectangles
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
                stroke="#fff"
            />
            {width > 40 &&
                height > 20 && ( // only show text if rectangle is big enough
                    <text
                        x={x + width / 2}
                        y={y + height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#fff"
                        fontSize={12}
                        fontWeight={100}
                    >
                        {name}
                    </text>
                )}
        </g>
    );
};

const TopExpensesTreemap = ({ data }: { data: JSONObject[] }) => (
    <ResponsiveContainer width="100%" height={400}>
        <Treemap
            data={data}
            dataKey="value"
            stroke="#fff"
            content={<CustomizedContent />} // pass as element
        >
            <Tooltip
                content={({ payload }) =>
                    payload?.length ? (
                        <div
                            style={{
                                background: '#fff',
                                padding: 5,
                                border: '1px solid #ccc'
                            }}
                        >
                            <b>{payload[0].payload.name}</b>:
                            {formatCurrency(payload[0].payload.value)}
                        </div>
                    ) : null
                }
            />
        </Treemap>
    </ResponsiveContainer>
);

export default TopExpensesTreemap;
