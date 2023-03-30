import { useEffect } from 'react';

const useEffectOnce = (effect) => {
  return useEffect(effect, []);
};

export default useEffectOnce;
