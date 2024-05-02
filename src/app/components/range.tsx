import React, { useState, useEffect, useCallback, useRef } from 'react';

interface RangeProps {
  min: number;
  max: number;
}

const Range: React.FC<RangeProps> = ({ min, max }) => {
  const [range, setRange] = useState({ min, max });
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const getValue = useCallback(
    (percentage: number) => ((max - min) / 100) * percentage + min,
    [min, max]
  );

  const change = useCallback(
    (clientX: number, type: 'min' | 'max') => {
      if (!rangeRef.current) return;
  
      const rect = rangeRef.current.getBoundingClientRect();
      const x = clientX - rect.left; // x position within the element
      const width = rect.right - rect.left;
      const percentage = (x / width) * 100;
      let value = getValue(percentage);
  
      // Limit the value to the min and max
      value = Math.max(min, Math.min(max, value));
  
      setRange((prev) =>
        type === 'min'
          ? { ...prev, min: Math.min(value, prev.max) }
          : { ...prev, max: Math.max(value, prev.min) }
      );
    },
    [getValue, min, max]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragging) {
        change(e.clientX, dragging);
      }
    },
    [dragging, change]
  );

  const handleMouseMoveDocument = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        change(e.clientX, dragging);
      }
    },
    [dragging, change]
  );
  
  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMoveDocument);
    document.addEventListener('mouseup', handleMouseUp);
  
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveDocument);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMoveDocument, handleMouseUp]);
  
  return (
    <div style={{display: "flex", alignContent: "center"}}>
    <div
      ref={rangeRef}
      style={{
        height: '10px',
        width: '300px',
        background: 'lightgray',
        position: 'relative',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          background: 'dodgerblue',
          height: '100%',
          left: `${getPercentage(range.min)}%`,
          right: `${100 - getPercentage(range.max)}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          width: '18px',
          height: '18px',
          background: 'white',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.8)',
          left: `${getPercentage(range.min)}%`,
          marginLeft: '-10px',
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging('min');
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          width: '18px',
          height: '18px',
          background: 'white',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.8)',
          left: `${getPercentage(range.max)}%`,
          marginLeft: '-10px',
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging('max');
        }}
      />
      <div style={{ position: 'absolute', left: "-30px", top: 0, fontSize: "12px" }}>{min}</div>
      <div style={{ position: 'absolute', right: "-40px", top: 0, fontSize: "12px" }}>{max}</div>
    <div style={{ position: 'absolute', left: `${getPercentage(range.min)-3}%`, top: '30px',fontSize: "12px" }}>{range.min.toFixed(0)}</div>
      <div style={{ position: 'absolute', left: `${getPercentage(range.max)-3}%`, top: '30px', fontSize: "12px" }}>{range.max.toFixed(0)}</div>
    </div>
    </div>
  );
};

export default Range;