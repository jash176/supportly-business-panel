import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { visitorStats } from '@/lib/mockData';

const VisitorStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {visitorStats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-500">{stat.label}</h3>
            <span className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {stat.change >= 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {`+${stat.change}%`}
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  {`${stat.change}%`}
                </>
              )}
            </span>
          </div>
          <p className="text-2xl font-semibold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default VisitorStats;
