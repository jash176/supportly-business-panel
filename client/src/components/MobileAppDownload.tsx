import { Link } from 'wouter';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileAppDownload: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
      <div className="mb-8">
        <div className="text-3xl text-indigo-600 mb-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Get the Supportly App</h1>
        <p className="text-gray-600 mb-6">
          To use the app on your mobile device, please download our mobile app.
        </p>
      </div>
      
      <div className="flex flex-col space-y-4 w-full max-w-xs mb-8">
        <Button className="bg-black text-white hover:bg-gray-800 py-6">
          <div className="flex items-center">
            <div className="mr-3">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 16c1-1 2-3 2-6s-1-5-2-6M8 16c-1-1-2-3-2-6s1-5 2-6M12 20v-6M9 12h6"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-xl font-semibold">App Store</div>
            </div>
          </div>
        </Button>
        
        <Button className="bg-black text-white hover:bg-gray-800 py-6">
          <div className="flex items-center">
            <div className="mr-3">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 3 21 12 3 21 3 3"></polygon>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs">GET IT ON</div>
              <div className="text-xl font-semibold">Google Play</div>
            </div>
          </div>
        </Button>
      </div>
      
      <div>
        <Link href="/settings">
          <a className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <Settings className="mr-2" size={18} />
            <span>Access Settings</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileAppDownload;