import type { DCAResult } from '../types/dca.types';

interface DCAResultsProps {
	result: DCAResult;
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

function DCAResults({ result }: DCAResultsProps) {
	const { summary, input } = result;
	const isPositive = summary.absoluteReturn >= 0;

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-sm text-gray-500">Total invested</p>
					<p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalInvested, input.currency)}</p>
				</div>

				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-sm text-gray-500">Final value</p>
					<p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.finalValue, input.currency)}</p>
				</div>

				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-sm text-gray-500">Absolute return</p>
					<p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
						{isPositive && '+'}
						{formatCurrency(summary.absoluteReturn, input.currency)}
					</p>
				</div>

				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-sm text-gray-500">Percentage return</p>
					<p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{formatPercentage(summary.percentageReturn)}</p>
				</div>
			</div>

			<div className="bg-gray-50 rounded-lg p-4">
				<p className="text-sm text-gray-500 mb-2">Details</p>
				<div className="grid grid-cols-2 gap-2 text-sm">
					<div>
						<span className="text-gray-500">Total units acquired: </span>
						<span className="font-medium text-gray-900">{summary.totalUnits.toFixed(6)}</span>
					</div>
					<div>
						<span className="text-gray-500">Final price: </span>
						<span className="font-medium text-gray-900">{formatCurrency(summary.finalPrice, input.currency)}</span>
					</div>
					<div>
						<span className="text-gray-500">Number of purchases: </span>
						<span className="font-medium text-gray-900">{result.purchases.length}</span>
					</div>
					<div>
						<span className="text-gray-500">Average purchase price: </span>
						<span className="font-medium text-gray-900">{formatCurrency(summary.totalInvested / summary.totalUnits, input.currency)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DCAResults;
