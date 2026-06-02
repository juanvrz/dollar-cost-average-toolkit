import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DCAPurchase } from '../types/dca.types';

interface DCAChartProps {
	purchases: DCAPurchase[];
	comparisonPurchases?: DCAPurchase[];
	currency: string;
}

function DCAChart({ purchases, comparisonPurchases, currency }: DCAChartProps) {
	const data = purchases.map((p, i) => ({
		date: p.date,
		invested: Number(p.totalInvested.toFixed(2)),
		value: Number(p.portfolioValue.toFixed(2)),
		comparison: comparisonPurchases?.[i] ? Number(comparisonPurchases[i].portfolioValue.toFixed(2)) : undefined,
	}));

	const formatYAxis = (value: number) => {
		if (value >= 1000) {
			return `${(value / 1000).toFixed(1)}k`;
		}
		return value.toString();
	};

	const formatTooltip = (value: unknown) => {
		const numValue = typeof value === 'number' ? value : Number(value);
		if (isNaN(numValue)) {
			return '';
		}
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
		}).format(numValue);
	};

	return (
		<div className="w-full h-80">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
					<XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
					<YAxis stroke="#6b7280" fontSize={12} tickFormatter={formatYAxis} />
					<Tooltip formatter={formatTooltip as never} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
					<Legend wrapperStyle={{ paddingTop: '10px' }} />
					<Line type="monotone" dataKey="invested" name="Total invested" stroke="#6b7280" strokeWidth={2} dot={false} />
					<Line type="monotone" dataKey="value" name="DCA value" stroke="#2563eb" strokeWidth={2} dot={false} />
					{comparisonPurchases && <Line type="monotone" dataKey="comparison" name="Lump-sum value" stroke="#9333ea" strokeWidth={2} dot={false} />}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default DCAChart;
