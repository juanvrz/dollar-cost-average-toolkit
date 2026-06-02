import type { DCAResult, DCASummary } from '../types/dca.types';

interface DCAResultsProps {
	result: DCAResult;
}

interface StrategyCardProps {
	label: string;
	color: 'blue' | 'purple';
	summary: DCASummary;
	numberOfPurchases: number;
	currency: string;
}

function formatCurrency(value: number, currency: string): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

function formatPercentage(value: number): string {
	const sign = value >= 0 ? '+' : '';
	return `${sign}${value.toFixed(2)}%`;
}

function StrategyCard({ label, color, summary, numberOfPurchases, currency }: StrategyCardProps) {
	const isPositive = summary.absoluteReturn >= 0;

	const colorClasses = {
		blue: {
			border: 'border-blue-500 dark:border-blue-400',
			badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
		},
		purple: {
			border: 'border-purple-500 dark:border-purple-400',
			badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
		},
	};

	const c = colorClasses[color];

	return (
		<div className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 ${c.border} shadow-sm p-5`}>
			<div className="flex items-center justify-between mb-4">
				<span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${c.badge}`}>{label}</span>
				<span className={`text-3xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatPercentage(summary.percentageReturn)}</span>
			</div>

			<div className="grid grid-cols-2 gap-3 mb-4">
				<div>
					<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Invested</p>
					<p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(summary.totalInvested, currency)}</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Final value</p>
					<p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(summary.finalValue, currency)}</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Profit / Loss</p>
					<p className={`text-lg font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
						{isPositive && '+'}
						{formatCurrency(summary.absoluteReturn, currency)}
					</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Units acquired</p>
					<p className="text-lg font-semibold text-gray-900 dark:text-white">{summary.totalUnits.toFixed(6)}</p>
				</div>
			</div>

			<div className="pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-3 text-xs">
				<div>
					<span className="text-gray-500 dark:text-gray-400">Purchases: </span>
					<span className="font-medium text-gray-900 dark:text-white">{numberOfPurchases}</span>
				</div>
				<div>
					<span className="text-gray-500 dark:text-gray-400">Avg. price: </span>
					<span className="font-medium text-gray-900 dark:text-white">{formatCurrency(summary.totalInvested / summary.totalUnits, currency)}</span>
				</div>
			</div>
		</div>
	);
}

function DCAResults({ result }: DCAResultsProps) {
	const { summary, input, comparison, purchases } = result;

	return (
		<div className={`grid gap-4 ${comparison ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
			<StrategyCard label="DCA Strategy" color="blue" summary={summary} numberOfPurchases={purchases.length} currency={input.currency} />

			{comparison && <StrategyCard label="Lump-sum Strategy" color="purple" summary={comparison.summary} numberOfPurchases={1} currency={input.currency} />}
		</div>
	);
}

export default DCAResults;
