import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollCache: { [key: string]: any } = {};

const useScrollCache = (key: string) => {
  const containerRef = useRef<any>(null);
  const location = useLocation();

  const onScroll = (e: any) => {
    scrollCache[key] = window.scrollY;
  };

  useEffect(() => {
    if (containerRef.current && scrollCache[key]) {
      containerRef.current.scrollTo(0, scrollCache[key]);
    }
  }, [location]);

  return { onScroll, containerRef };
};

export default useScrollCache;
