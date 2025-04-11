import { useEffect, useRef } from 'react';
import { Visitor } from '@/data/mockData';
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useState } from 'react';

// Sample static visitors for demonstration
const staticVisitors = [
  { id: 1, name: 'User 1', location: { city: 'New York', country: 'USA', coordinates: { lat: 40.7128, lng: -74.0060 } } },
  { id: 2, name: 'User 2', location: { city: 'London', country: 'UK', coordinates: { lat: 51.5074, lng: -0.1278 } } },
  { id: 3, name: 'User 3', location: { city: 'Tokyo', country: 'Japan', coordinates: { lat: 35.6762, lng: 139.6503 } } },
  { id: 4, name: 'User 4', location: { city: 'Sydney', country: 'Australia', coordinates: { lat: -33.8688, lng: 151.2093 } } },
  { id: 5, name: 'User 5', location: { city: 'Rio de Janeiro', country: 'Brazil', coordinates: { lat: -22.9068, lng: -43.1729 } } },
];

interface MapProps {
  visitors: Visitor[];
  onMarkerClick?: (visitor: Visitor) => void;
}

// Custom marker component that will be rendered on the map
const CustomMarkers = ({ visitors, onMarkerClick }: { 
  visitors: Visitor[], 
  onMarkerClick?: (visitor: Visitor) => void 
}) => {
  const map = useMap();
  
  useEffect(() => {
    const markers: L.Marker[] = [];
    
    visitors.forEach(visitor => {
      // Create a custom HTML element for the marker
      const customMarkerHtml = `
        <div class="custom-marker">
          <div class="w-4 h-4 bg-indigo-500 rounded-full animate-ping opacity-75 absolute"></div>
          <div class="w-4 h-4 bg-indigo-500 rounded-full relative cursor-pointer"></div>
        </div>
      `;
      
      // Create a custom icon using the HTML
      const customIcon = L.divIcon({
        html: customMarkerHtml,
        className: 'custom-marker-container',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      
      // Create the marker with the custom icon
      const marker = L.marker(
        [visitor.location.coordinates.lat, visitor.location.coordinates.lng],
        { icon: customIcon }
      );
      
      // Add popup
      const popupContent = `
        <div>
          <strong>${visitor.name}</strong>
          <p>${visitor.location.city}, ${visitor.location.country}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
      
      // Add click handler
      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(visitor);
        }
      });
      
      // Add marker to the map
      marker.addTo(map);
      markers.push(marker);
    });
    
    // Cleanup function to remove markers when component unmounts
    return () => {
      markers.forEach(marker => {
        marker.remove();
      });
    };
  }, [map, visitors, onMarkerClick]);
  
  return null;
};

const WorldMap: React.FC<MapProps> = ({ visitors, onMarkerClick }) => {
  // Use provided visitors or fall back to static ones if empty
  const displayVisitors = visitors.length > 0 ? visitors : staticVisitors;
  const [showZoomPaywall, setShowZoomPaywall] = useState(false);
  
  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        minZoom={2}
        maxZoom={4}
        maxBounds={[[-90, -180], [90, 180]]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <CustomMarkers visitors={displayVisitors} onMarkerClick={onMarkerClick} />
        
        {/* Zoom change detector */}
        <ZoomChangeDetector onZoomChange={(zoom) => {
          if (zoom > 3) {
            setShowZoomPaywall(true);
          }
        }} />
      </MapContainer>
      
      {/* Zoom paywall overlay */}
      {showZoomPaywall && (
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <div className="text-white text-center p-6">
            <p className="text-lg font-medium">Map zoom is only available from paid plans.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium"
              onClick={() => setShowZoomPaywall(false)}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
      
      {/* Add some CSS for the markers */}
      <style>{`
        .custom-marker-container {
          background: transparent;
          border: none;
        }
        .custom-marker {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

// Helper component to detect zoom changes
const ZoomChangeDetector = ({ onZoomChange }: { onZoomChange: (zoom: number) => void }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      onZoomChange(currentZoom);
    };
    
    map.on('zoomend', handleZoomEnd);
    
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, onZoomChange]);
  
  return null;
};

export default WorldMap;
