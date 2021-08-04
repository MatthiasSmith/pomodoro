// taken from https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
import { useState, useEffect } from 'react';

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function useCurrentWidth() {
  const [width, setWidth] = useState<number>(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const resizeListener = () => {
      if (isMounted) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => isMounted && setWidth(getWidth()), 150);
      }
    };
    window.addEventListener('resize', resizeListener);
    resizeListener();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return width;
}

export default useCurrentWidth;
