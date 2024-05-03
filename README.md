## mg-range-input

mg-range-input is a React-typescript custom range input. 

[![npm](https://img.shields.io/npm/v/mg-range-input)](https://www.npmjs.com/package/mg-range-input)

<p align="center">
  <img src="" alt="Range input">
</p>

## Installation

```bash
npm install mg-range-input
```

## Use

```ts
import { Range } from 'mg-range-input'

function App() {

  return (
    <>
        <Range min={5.99} max={19.99} selectableValues={[0,10,20,30,40,50,60,70,80,90,100]} />
        <Range min={5.99} max={70.99} selectableValues={[5.99, 10.99, 30.99, 50.99, 70.99]}/>
    <>
  )
}

export default App
```