import { useEffect } from "react";

export function useKeydown(key, callback) {
  function handleCallback(e) {
    if (e.code.toLowerCase() === key.toLowerCase()) {
      callback();
    }
  }

  useEffect(() => {
      document.addEventListener("keydown", handleCallback);
      
    return function () {
      document.removeEventListener("keydown", handleCallback);
    };
  });
}
