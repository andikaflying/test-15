import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * 8 - namespace
 * Namespaces are a way to organize your code 
 */
namespace ModuleExample {
  export function calculate1(a: number, b: number): number | never {
    return a + b;
  }

  export function calculate2(a: number, b: number): number | never {
    return a - b;
  }
}
 
let result1 = ModuleExample.calculate1(5,6);
let result2 = ModuleExample.calculate2(5,6);

console.log("Result 1 ", result1, ", Result 2 ", result2);

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

  /**
   * 7 - keyof
   * keyof dipake utk mendapatkan key dari Type
   */
  type UserKeys = keyof User; // "name" | "age"


  /**
   * 8 - Using Utility Types
   * keyof dipake utk mendapatkan key dari Type
  */

  /**
   * Pick untuk mengambil properti2x tertentu dari suatu type
   */
  type User2 = { name: string, age: number, email: string };
  type UserInfo = Pick<User2, "name" | "email">;  //Cuma jadi name & email

  /**
   * Exclude untuk mengambil properti2x tertentu dari suatu type dgn cara mengeliminasi
   */
  type UserInfo2 = Exclude<User2, "email">;

  /**
   * Partial untuk membuat tipe nya jadi optional semua
   */
  type PartialUser = Partial<User2>;

  /**
   * Readonly utk membuat variable tidak bisa diganti lagi value nya
   */
  let andikaVar: Readonly<User2> = {name: "Andika", age: 2, email: "test@gmail.com"};
  // andikaVar.name = "Test";


  /**
   * 9 - Type Guards
   * Menjaga type operator
   */

  function isNumber(x: any): x is number {
    return typeof x === "number";
  }

  //Using "in"
  interface Pupil {
    ID: string;
  }
  interface Adult {
    SSN: number;
  }
  interface Person {
    name: string;
    age: number;
  }
  let person: Pupil | Adult | Person = {
    name: 'Britney',
    age: 6
  };

  const getIdentifier = (person: Pupil | Adult | Person) => {
    if ('name' in person) {
      return person.name;
    }
    else if ('ID' in person) {
      return person.ID
    }
    return person.SSN;
  }

  let value3 = 3;
  if (isNumber(value3)) {
    value3.toFixed(2); // TypeScript knows that "value" is a number because of the type guard
  }

  /**
   * 10 - Infer
   * The infer keyword is a powerful feature of TypeScript that allows you to extract the type of a variable in a type.
   */
  type ArrayType<T> = T extends (infer U)[] ? U : never;
  type MyArray = ArrayType<string[]>; // MyArray is of type string

  type ObjectType<T> = T extends { [key: string]: infer U } ? U : never;
  type MyObject = ObjectType<{ name: string, age: number }>; // MyObject is of type {name:string, age: number}

  type PickProperties<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
  type P1 = PickProperties<{ a: number, b: string, c: boolean }, string | number>; // "a" | "b"

  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
  type R1 = ReturnType<() => string>; // string
  type R2 = ReturnType<() => void>; // void

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
