import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AvailabilityScreen = () => {
  const [forceOffline, setForceOffline] = useState(false);
  const [availableWhenApp, setAvailableWhenApp] = useState(true);
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("UTC");

  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timezoneOptions = [
    "UTC -12:00",
    "UTC -11:00",
    "UTC -10:00",
    "UTC -09:30",
    "UTC -09:00",
    "UTC -08:00",
    "UTC -07:00",
    "UTC -06:00",
    "UTC -05:00",
    "UTC -04:30",
    "UTC -04:00",
    "UTC -03:30",
    "UTC -03:00",
    "UTC -02:00",
    "UTC -01:00",
    "UTC ±00:00",
    "UTC +01:00",
    "UTC +02:00",
    "UTC +03:00",
    "UTC +03:30",
    "UTC +04:00",
    "UTC +04:30",
    "UTC +05:00",
    "UTC +05:30",
    "UTC +05:45",
    "UTC +06:00",
    "UTC +06:30",
    "UTC +07:00",
    "UTC +08:00",
    "UTC +08:45",
    "UTC +09:00",
    "UTC +09:30",
    "UTC +10:00",
    "UTC +10:30",
    "UTC +11:00",
    "UTC +12:00",
    "UTC +12:45",
    "UTC +13:00",
    "UTC +14:00",
  ];

  const currentStatus = forceOffline ? "Offline" : "Online";

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSaveChanges = () => {
    console.log({
      forceOffline,
      availableWhenApp,
      enableSchedule,
      selectedDays,
      timezone,
    });
  };

  const dayMap: { [key: string]: string } = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  // Define status styles based on current status
  const statusStyles =
    currentStatus === "Online"
      ? "bg-green-50 text-green-600 border border-green-500 rounded"
      : "bg-gray-50 text-gray-600 border border-gray-400 rounded";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 p-6">
      <h2 className="text-lg font-semibold mb-2">Availability Settings</h2>
      <div className={`${statusStyles} mb-10 p-4`}>
        <p className="text-sm text-gray-500 mb-4">
          You are currently seen as:{" "}
          <span
            className={`font-medium ${
              currentStatus === "Online" ? "text-green-600" : "text-gray-600"
            }`}
          >
            {currentStatus}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Set yourself available on schedule, by configuring days and times (in
          your timezone). Visitors will see you as away off scheduled hours, but
          they can still send you messages.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm">Force Offline</span>
          <Switch checked={forceOffline} onCheckedChange={setForceOffline} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Set me available when using the app</span>
          <Switch
            checked={availableWhenApp}
            onCheckedChange={setAvailableWhenApp}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Enable availability schedule</span>
          <Switch
            checked={enableSchedule}
            onCheckedChange={setEnableSchedule}
          />
        </div>
      </div>

      {enableSchedule && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Select days:</p>
          <div className="flex flex-wrap gap-2">
            {daysOptions.map((day) => (
              <button
                key={day}
                disabled={!enableSchedule}
                onClick={() => enableSchedule && handleDayToggle(day)}
                className={`px-3 py-1 rounded border text-sm ${
                  enableSchedule ? "" : "opacity-50 pointer-events-none"
                } ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {dayMap[day]}
              </button>
            ))}
          </div>
        </div>
      )}

      {!enableSchedule && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Select days:</p>
          <div className="flex flex-wrap gap-2">
            {daysOptions.map((day) => (
              <button
                key={day}
                disabled
                className={`px-3 py-1 rounded border text-sm opacity-50 pointer-events-none ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {dayMap[day]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Timezone:</p>
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {timezoneOptions.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSaveChanges}>Save Changes</Button>
    </div>
  );
};

export default AvailabilityScreen;
