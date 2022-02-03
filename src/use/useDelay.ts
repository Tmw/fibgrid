// schedules a timer with a given timeout and callback. Everytime
// the `postpone` function is called, the timer is reset to its original timeout.
export function useDelay(timeout: number, cb: () => void) {
  let handle: number | null = null;

  const postpone = () => {
    if (handle !== null) {
      window.clearTimeout(handle);
    }

    handle = window.setTimeout(cb, timeout);
  };

  return { postpone };
}
