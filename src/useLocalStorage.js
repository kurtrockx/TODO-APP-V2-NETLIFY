import { useEffect, useState } from "react";

export function useLocalStorage(key) {
  const [items, setItems] = useState(() => {
    const existingItems = localStorage.getItem(key);
    console.log(existingItems);
    return existingItems ? JSON.parse(existingItems) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  return [items, setItems];
}
