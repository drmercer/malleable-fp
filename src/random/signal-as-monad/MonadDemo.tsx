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
      <input
        type="text"
        defaultValue={message}
        onInput={(e) => (message.value = e.currentTarget.value)}
      ></input>
      <pre>{messageWithLength}</pre>
      <hr />
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
        Start changing rapidly (to watch memory usage)
      </button>
      <p>
        <code>performance.memory.usedJSHeapSize: {usedHeapSize}</code>
      </p>
    </div>
  );
}
