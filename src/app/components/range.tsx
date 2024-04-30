import React, { useState, MouseEvent } from 'react';

interface RangeProps {
  min: number;
  max: number;
}

const Range: React.FC<RangeProps> = ({ min, max }) => {
  const [range, setRange] = useState({ min, max });

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const width = rect.right - rect.left;
    const position = x / width;
    const value = min + (max - min) * position;

    if (Math.abs(value - range.min) < Math.abs(value - range.max)) {
      setRange((prev) => ({ ...prev, min: value }));
    } else {
      setRange((prev) => ({ ...prev, max: value }));
    }
  };

  return (
    <div
      style={{
        height: '20px',
        background: 'red',
        position: 'relative',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          position: 'absolute',
          background: 'white',
          height: '100%',
          left: `${((range.min - min) / (max - min)) * 100}%`,
          right: `${100 - ((range.max - min) / (max - min)) * 100}%`,
        }}
      />
    </div>
  );
};

export default Range;