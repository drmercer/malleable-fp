import type { ComponentChildren } from "preact";
import "./Counter.css";
import { useSignal } from "@preact/signals";

export interface CounterProps {
  children: ComponentChildren;
}

export default function Counter({ children }: CounterProps) {
  const count = useSignal(0);
  const add = () => count.value++;
  const subtract = () => count.value--;

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div>{children}</div>
    </>
  );
}
