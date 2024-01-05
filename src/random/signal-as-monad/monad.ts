import { computed, type Signal } from "@preact/signals";

/**
 * Monad's "pure" function.
 */
export function pure<A>(value: A): Signal<A> {
  console.log(`Created "pure" signal with value ${value}`);
  return computed(() => {
    console.log(`Computed "pure" signal with value ${value}`);
    return value;
  });
}

/**
 * Monad's "flatMap" function.
 */
export function flatMap<A, B>(
  sa: Signal<A>,
  f: (a: A) => Signal<B>
): Signal<B> {
  return computed(() => {
    // this creates a new signal every time, but we don't care because Preact signals will forget the old and learn the new each time this runs
    const sb = f(sa.value);
    const value = sb.value;
    console.log(`Computed "flatMap" signal with value ${value}`);
    return value;
  });
}

/**
 * Functor's map function.
 */
export function map<A, B>(sa: Signal<A>, f: (a: A) => B): Signal<B> {
  return flatMap(sa, (a) => pure(f(a)));
  // this would be more efficient, but I use the above to demonstrate the concepts (the two implementations are functionally equivalent)
  // return computed(() => f(sa.value));
}
