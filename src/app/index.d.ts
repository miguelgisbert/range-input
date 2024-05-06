declare module 'mg-range-input' {
    import { FC } from 'react';
  
    export interface RangeProps {
      min: number;
      max: number;
      selectableValues?: number[];
    }
  
    const Range: FC<RangeProps>;
  
    export { Range };
  }