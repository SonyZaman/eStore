// File: components/charts/SimplePieChart.tsx
interface CategoryData {
  category: string;
  count: number;
  value: number;
  percentage: number;
}

interface SimplePieChartProps {
  data: CategoryData[];
  title: string;
  subtitle: string;
}

const SimplePieChart = ({ data, title, subtitle }: SimplePieChartProps) => {
  const colors = ['#b16316', '#d4871f', '#f39c12', '#e67e22', '#ff6b35', '#ff8c42', '#ffa726', '#ffb74d'];
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-1 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-3"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm text-gray-700">{item.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{item.count}</span>
              <span className="text-xs text-gray-500">({item.percentage.toFixed(1)}%)</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Simple circular progress indicators */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-2">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="2"
                  strokeDasharray={`${item.percentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-900">{item.count}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 truncate">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplePieChart;