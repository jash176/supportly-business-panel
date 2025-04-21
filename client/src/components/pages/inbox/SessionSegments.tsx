import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useUpdateMeta } from '@/hooks/useUpdateMeta';

const STORAGE_KEY = 'session_segments';

interface SessionSegmentsProps {
  sessionId: number;
  defaultSegments: Array<string>
}

const SessionSegments = (props: SessionSegmentsProps) => {
  const {sessionId, defaultSegments} = props;
  const {mutateAsync: updateMeta} = useUpdateMeta();
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>(defaultSegments);
  const [segments, setSegments] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load segments from localStorage on component mount
  useEffect(() => {
    const storedSegments = localStorage.getItem(STORAGE_KEY);
    if (storedSegments) {
      setSegments(JSON.parse(storedSegments));
    }
  }, []);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim()) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.trim()) {
      setIsDropdownOpen(true);
    }
  };

  const handleSegmentClick = async (segment: string) => {
    // Add segment to selected segments
    const newSelectedSegments = [...selectedSegments, segment];
    setSelectedSegments(newSelectedSegments);
    await updateMeta({segments: newSelectedSegments, sessionId});
    // Save to localStorage if it's not already in segments
    if (!segments.includes(segment)) {
      const newSegments = [...segments, segment];
      setSegments(newSegments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSegments));
    }
    
    // Clear input and close dropdown
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const handleRemoveSegment = async (segment: string) => {
    const newSegments = selectedSegments.filter(s => s !== segment)
    setSelectedSegments(newSegments);
    updateMeta({segments: newSegments, sessionId});
  };

  const filteredSegments = segments.filter(segment => 
    segment.toLowerCase().includes(inputValue.toLowerCase()) && 
    !selectedSegments.includes(segment)
  );

  return (
    <div className="relative w-full space-y-4 p-4 border-t">
      {/* Selected segments */}
      <div className="flex flex-wrap gap-1 mb-1">
        {selectedSegments.map((segment, index) => (
          <div 
            key={index} 
            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {segment}
            <button 
              onClick={() => handleRemoveSegment(segment)}
              className="text-secondary-foreground/70 hover:text-secondary-foreground"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Input field */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Segment conversation..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full"
        />
        
        {/* Dropdown */}
        {isDropdownOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 w-full mt-1 bg-background border border-border rounded-md shadow-md z-10"
          >
            <ScrollArea className="max-h-[200px]">
              <div className="p-1">
                {/* Current input as first item if not empty */}
                {inputValue.trim() && !segments.includes(inputValue) && (
                  <div
                    className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm"
                    onClick={() => handleSegmentClick(inputValue)}
                  >
                    {inputValue}
                  </div>
                )}
                
                {/* Stored segments */}
                {filteredSegments.length > 0 ? (
                  filteredSegments.map((segment, index) => (
                    <div
                      key={index}
                      className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm"
                      onClick={() => handleSegmentClick(segment)}
                    >
                      {segment}
                    </div>
                  ))
                ) : (
                  inputValue.trim() && segments.includes(inputValue) ? null : 
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No segments found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionSegments;