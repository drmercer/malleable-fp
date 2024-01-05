import { Signal, signal } from "@preact/signals";
import { flatMap, map } from "./monad";

const message = signal("my message");

const messageLength: Signal<number> = map(message, (s: string) => {
  console.log(`Computed length of string "${s}": ${s.length}`);
  return s.length;
});

const messageWithLength: Signal<string> = flatMap<string, string>(
  message,
  (message: string) => {
    return map<number, string>(messageLength, (messageLength: number) => {
      return `${messageLength}: ${message}`;
    });
  }
);

const usedHeapSize = signal<number | undefined>(undefined);

export function MonadDemo() {
  return (
    <div>
      <h2>Interactive demo</h2>
      <input
        type="text"
        defaultValue={message}
        onInput={(e) => (message.value = e.currentTarget.value)}
      ></input>
      <pre>{messageWithLength}</pre>
      <hr />
      <h2>Memory testing</h2>
      <p>
        Click the button below to rapidly change the <code>message</code> value
        and see how the JS memory usage reacts. It may grow at first (due to
        discarded objects) but they should be GC'd once the garbage collector
        kicks in, so the memory should not grow unboundedly.
      </p>
      <button
        onClick={() => {
          setInterval(() => {
            if (Math.random() > 0.5) {
              message.value += "yeet";
            } else {
              message.value = message.value.slice(0, -4);
            }
            usedHeapSize.value = (
              window.performance as any
            ).memory.usedJSHeapSize;
          }, 100);
        }}
      >
        Start changing rapidly
      </button>
      <p>
        <code>performance.memory.usedJSHeapSize: {usedHeapSize}</code>
      </p>
    </div>
  );
}
