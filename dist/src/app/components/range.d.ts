import React from 'react';
interface RangeProps {
    min: number;
    max: number;
    selectableValues?: number[];
}
declare const Range: React.FC<RangeProps>;
export { Range };
