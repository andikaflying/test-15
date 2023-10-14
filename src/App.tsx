import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  /** 1 - Inference
   * Type inference is the ability of the TypeScript compiler to automatically determine the type 
   * of a variable based on the value that is assigned to it.
   */
  let name = "John";

  /**
   * Type Aliases
   * The main difference between features type alias and interfaceis that type alias creates 
   * a new name for the type, whereas interface creates a new name for the shape of the object.
   */
  type User = { name: string, age: number };
  type Admin = { name: string, age: number, privileges: string[] };
  //Union
  type SuperUser = User & Admin;

  /**
   * 3 - Tuples
   * Tuples are a way to represent a fixed-size array of elements with different types. 
   * They allow you to express a collection of values with a specific order and types.
   */
  let point: [number, number] = [1, 2];
  let [x, y] = point;
  console.log(x, y);

  /**
   * 4 - Unknown
   * The unknown type is a powerful and restrictive type that was introduced in TypeScript 3.0. 
   * Kelebihan unknown = Tidak bisa diassign ke variabel lain kecuali type unknown dan any
   */
  let value: unknown = "hello";
  // let str: string = value; // Error: Type 'unknown' is not assignable to type 'string'.
  
  function stringifyForLogging(value: unknown): string {
    if (typeof value === "function") {
      // Within this branch, `value` has type `Function`,
      // so we can access the function's `name` property
      const functionName = value.name || "(anonymous)";
      return `[function ${functionName}]`;
    }
  
    if (value instanceof Date) {
      // Within this branch, `value` has type `Date`,
      // so we can call the `toISOString` method
      return value.toISOString();
    }
  
    return String(value);
  }

  /**
   * 5 - never
   * Never dipake utk throw error. Ketika pake never maka variabel itu tidak return apapun
   */
  function divide(numerator: number, denominator: number): number | never {
    if (denominator === 0) {
      throw new Error("Cannot divide by zero");
    }
    
    return numerator / denominator;
  }

  /**
   * 6 - enum
   * Enum = Pengelompokan
   */

  enum OrderStatus {
    Pending = 1,
    Processing = 2,
    Shipped = 3,
    Delivered = 4,
    Cancelled = 5
   }
   
   let orderStatus: OrderStatus = OrderStatus.Pending;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
