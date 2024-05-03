import React, { useState, useEffect, useCallback, useRef } from 'react';

interface RangeProps {
  min: number;
  max: number;
}

const Range: React.FC<RangeProps> = ({ min, max }) => {
  const [range, setRange] = useState({ min, max });
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<null | 'min' | 'max'>(null);
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [inputMinValue, setInputMinValue] = useState<number>(min);
  const [inputMaxValue, setInputMaxValue] = useState<number>(max);

  const getPercentage = useCallback(
    (value: number) => Math.round(((value - minValue) / (maxValue - minValue)) * 100),
    [minValue, maxValue]
  );

  const getValue = useCallback(
    (percentage: number) => ((maxValue - minValue) / 100) * percentage + minValue,
    [minValue, maxValue]
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
      value = Math.max(minValue, Math.min(maxValue, value));
  
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

  const handleMinValueChange = () => {
    if(!isNaN(inputMinValue) && inputMinValue < maxValue) {
      setMinValue(Number(inputMinValue));
      setEditingMin(false);
      setRange((prevRange) => ({
        ...prevRange,
        min: inputMinValue > prevRange.min ? inputMinValue : prevRange.min,
        max: inputMinValue > prevRange.max ? inputMinValue : prevRange.max
      }));
    }
  }
  const handleMaxValueChange = () => {
    if(!isNaN(inputMaxValue) && inputMaxValue > minValue) {
      setMaxValue(Number(inputMaxValue));
      setEditingMax(false);
      setRange((prevRange) => ({
        ...prevRange,
        min: inputMaxValue < prevRange.min ? inputMaxValue : prevRange.min,
        max: inputMaxValue < prevRange.max ? inputMaxValue : prevRange.max
      }));
    }
  };

  // Avoid numbers overlapping
  const [overlap, setOverlap] = useState(false);
  useEffect(() => {
    const threshold = (maxValue - minValue) * 0.1;
    if (Math.abs(range.min - range.max) < threshold) {
      setOverlap(true);
    } else {
      setOverlap(false);
    }
  }, [range]);
  
  return (
    <div 
      style={{
        display: "flex", 
        alignContent: "center",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'default'
      }}
      >
      {editingMin ? (
        <input
          type="number"
          value={inputMinValue}
          style={{marginRight: "20px", width: "auto"}}
          onChange={(e) => setInputMinValue(Number(e.target.value))}
          onBlur={handleMinValueChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleMinValueChange();
            }
          }}
        />
      ) : (
        <div 
          onClick={() => setEditingMin(true)}
          style={{ 
            width: "auto",
            padding: "10px 20px",
            fontSize: "12px",
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'pointer'
            }}
          >
            {minValue}
        </div>
      )}
      <div
        ref={rangeRef}
        style={{
          height: '10px',
          width: '300px',
          background: 'lightgray',
          borderRadius: '5px',
          position: 'relative',
          userSelect: 'none', 
          cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'default'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          style={{
            position: 'absolute',
            background: 'dodgerblue',
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.8)',
            height: '100%', 
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'default',
            left: `${getPercentage(range.min)}%`,
            right: `${100 - getPercentage(range.max)}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: hover === 'min' || dragging === 'min' ? '-6px' : '-4px',
            width:  hover === 'min' || dragging === 'min' ? '22px' : '18px',
            height:  hover === 'min' || dragging === 'min' ? '22px' : '18px',
            background: 'white',
            borderRadius: '50%',
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'pointer',
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.8)',
            left: `${getPercentage(range.min)}%`,
            marginLeft: '-10px',
            zIndex: maxValue - range.min < (maxValue - minValue) * 0.1 ? 10 : 0,
            transition: 'width 0.2s, height 0.2s, top 0.2s',
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging('min');
          }}
          onMouseEnter={() => setHover('min')}
          onMouseLeave={() => setHover(null)}
        />
        <div
          style={{
            position: 'absolute',
            top: hover === 'max' || dragging === 'max' ? '-6px' : '-4px',
            width:  hover === 'max' || dragging === 'max' ? '22px' : '18px',
            height:  hover === 'max' || dragging === 'max' ? '22px' : '18px',
            background: 'white',
            borderRadius: '50%',
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'pointer',
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.8)',
            left: `${getPercentage(range.max)}%`,
            marginLeft: '-10px',
            zIndex: range.min - minValue < (maxValue - minValue) * 0.1 ? 10 : 0,
            transition: 'width 0.2s, height 0.2s, top 0.2s',
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging('max');
          }}
          onMouseEnter={() => setHover('max')}
          onMouseLeave={() => setHover(null)}
        />
        
        
      <div 
        style={{
          position: 'absolute',
          left: `${getPercentage(range.min)-3}%`, 
          top: overlap ? '-30px' : '30px',
          fontSize: "12px",
          zIndex: 5,
          cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'default'
          }}
        >
          {range.min.toFixed(0)}
        </div>
        <div 
          style={{ 
            position: 'absolute',
            left: `${getPercentage(range.max)-3}%`, 
            top: '30px', 
            fontSize: "12px",
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'default'
          }}
        >
          {range.max.toFixed(0)}
        </div>
      </div>
      {editingMax ? (
        <input
          type="number"
          value={inputMaxValue}
          style={{marginLeft: "20px", width: "auto"}}
          onChange={(e) => setInputMaxValue(Number(e.target.value))}
          onBlur={handleMaxValueChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleMaxValueChange();
            }
          }}
        />
      ) : (
        <div 
          onClick={() => setEditingMax(true)}
          style={{ 
            width: "auto",
            margin: "0 20px",
            fontSize: "12px",
            zIndex: 100,
            cursor: dragging ==='min' || dragging === 'max' ? 'col-resize' : 'pointer'
            }}
          >
            {maxValue}
        </div>
      )}
    </div>
  );
};

export default Range;