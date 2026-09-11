/**
 * <Context> AS PROVIDER (React 19)
 * --------------------------------
 * React 19 lets you render a context object directly as a provider:
 *     <MyContext value={...}>   instead of   <MyContext.Provider value={...}>
 * Both work; the shorter form is preferred going forward. Consumers still read it
 * with useContext (or the new use()).
 */

import { createContext, useContext } from "react";

const CountContext = createContext(0);

function Display() {
  return <p>Count from context: {useContext(CountContext)}</p>;
}

export function ContextAsProviderDemo() {
  return (
    // Note: no ".Provider" — context used directly as the provider component.
    <CountContext value={42}>
      <Display />
    </CountContext>
  );
}
