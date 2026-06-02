import { useState } from 'react';
import type { AssetDefinition } from '../types/asset.types';
import type { Currency, Frequency, DCAInput } from '../types/dca.types';

interface DCAFormProps {
	assets: AssetDefinition[];
	onSubmit: (input: DCAInput) => void;
}

function DCAForm({ assets, onSubmit }: DCAFormProps) {
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

			<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
				Simulate
			</button>
		</form>
	);
}

export default DCAForm;
