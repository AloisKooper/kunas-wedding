import { montserrat, playfairDisplay } from '@/fonts/fonts';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-section-light">
      <div className="text-center">
        <h1 className={`${playfairDisplay.className} text-6xl text-wedding-text-dark mb-4`}>404</h1>
        <h2 className={`${playfairDisplay.className} text-3xl text-wedding-text-dark mb-8`}>Page Not Found</h2>
        <p className={`${montserrat.className} text-gray-600 mb-8`}>
          The page you are looking for does not exist.
        </p>
        <Link 
          href="/"
          className={`${montserrat.className} px-6 py-3 bg-wedding-primary text-white rounded-lg hover:bg-opacity-90 transition-all`}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
