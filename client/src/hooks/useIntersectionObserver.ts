import { useEffect, useRef, useState } from 'react';

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  root,
  rootMargin = '10px',
  threshold = 0,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(onIntersect, { root, rootMargin, threshold }),
  );

  useEffect(() => {
    if (!target) return;

    observer.current.observe(target);

    return () => observer.current.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
