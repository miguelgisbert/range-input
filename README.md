## mg-range-input

mg-range-input is a React-typescript custom range input. 

[![npm](https://img.shields.io/npm/v/mg-range-input)](https://www.npmjs.com/package/mg-range-input)

<p align="center">
  <img src="https://github.com/miguelgisbert/range-input/blob/master/public/mg-range-input.png" alt="Range input" style="max-width: 400px;">
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
        <Range min={5.99} max={19.99} />
        <Range min={5.99} max={70.99} selectableValues={[5.99, 10.99, 30.99, 50.99, 70.99]}/>
    <>
  )
}

export default App
```