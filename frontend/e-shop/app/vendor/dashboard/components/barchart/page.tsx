// File: components/charts/SimpleBarChart.tsx
interface CategoryData {
  category: string;
  count: number;
  value: number;
  percentage: number;
}

interface SimpleBarChartProps {
  data: CategoryData[];
  title: string;
  subtitle: string;
  dataKey: 'count' | 'value';
  color?: string;
  formatter?: (value: number) => string;
}

const SimpleBarChart = ({ 
  data, 
  title, 
  subtitle, 
  dataKey, 
  color = '#b16316', 
  formatter 
}: SimpleBarChartProps) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-700 truncate mr-3">
              {item.category}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div
                className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                style={{
                  width: `${(item[dataKey] / maxValue) * 100}%`,
                  backgroundColor: color,
                  minWidth: '30px'
                }}
              >
                {formatter ? formatter(item[dataKey]) : item[dataKey]}
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 text-right ml-3">
              {formatter ? formatter(item[dataKey]) : item[dataKey]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;