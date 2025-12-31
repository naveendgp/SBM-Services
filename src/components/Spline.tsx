import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/FWMSMEi90GF80yYn/scene.splinecode" 
        />
      </Suspense>
    </main>
  );
}
