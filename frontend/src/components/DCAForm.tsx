import { useState } from 'react';
import type { AssetDefinition } from '../types/asset.types';
import type { Currency, Frequency, DCAInput } from '../types/dca.types';

interface DCAFormProps {
	assets: AssetDefinition[];
	onSubmit: (input: DCAInput) => void;
	onAddComparison: () => void;
	canAddComparison: boolean;
	hasResult: boolean;
	simulating: boolean;
	comparing: boolean;
}

function DCAForm({ assets, onSubmit, onAddComparison, canAddComparison, hasResult, simulating, comparing }: DCAFormProps) {
	const [assetId, setAssetId] = useState<string>('btc');
	const [amount, setAmount] = useState<number>(100);
	const [currency, setCurrency] = useState<Currency>('EUR');
	const [startDate, setStartDate] = useState<string>('2024-01-01');
	const [endDate, setEndDate] = useState<string>('2024-12-31');
	const [frequency, setFrequency] = useState<Frequency>('monthly');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			assetId,
			amountPerPurchase: amount,
			currency,
			startDate,
			endDate,
			frequency,
		});
	};

	const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
	const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
	const selectClass = "w-full appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-no-repeat bg-right";

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className={labelClass}>Asset</label>
				<select value={assetId} onChange={(e) => setAssetId(e.target.value)} className={selectClass}>
					{assets.map((asset) => (
						<option key={asset.id} value={asset.id}>
							{asset.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className={labelClass}>Amount per purchase</label>
				<input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={1} className={inputClass} />
			</div>

			<div>
				<label className={labelClass}>Currency</label>
				<select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className={selectClass}>
					<option value="EUR">EUR</option>
					<option value="USD">USD</option>
				</select>
			</div>

			<div>
				<label className={labelClass}>Start date</label>
				<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
			</div>

			<div>
				<label className={labelClass}>End date</label>
				<input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
			</div>

			<div>
				<label className={labelClass}>Frequency</label>
				<select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)} className={selectClass}>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="biweekly">Biweekly</option>
					<option value="monthly">Monthly</option>
				</select>
			</div>

			<button type="submit" disabled={simulating} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors mt-6 flex items-center justify-center gap-2">
				{simulating && (
					<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
				{simulating ? 'Simulating...' : 'Simulate'}
			</button>
			{hasResult && (
				<button type="button" onClick={onAddComparison} disabled={comparing} className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors mt-6 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${canAddComparison ? 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400' : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'}`}>
					{comparing && (
						<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					)}
					{comparing ? 'Adding comparison...' : canAddComparison ? '+ Compare with Lump-sum' : '× Remove comparison'}
				</button>
			)}
		</form>
	);
}

export default DCAForm;
