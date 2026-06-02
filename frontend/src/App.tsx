import { useEffect, useState } from 'react';
import { fetchAssets } from './services/assets.service';
import { simulateDCA } from './services/dca.service';
import DCAForm from './components/DCAForm';
import DCAResults from './components/DCAResults';
import DCAChart from './components/DCAChart';
import ThemeToggle from './components/ThemeToggle';
import type { AssetDefinition } from './types/asset.types';
import type { DCAInput, DCAResult } from './types/dca.types';

function App() {
	const [assets, setAssets] = useState<AssetDefinition[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<DCAResult | null>(null);
	const [simulating, setSimulating] = useState(false);
	const [comparing, setComparing] = useState(false);

	useEffect(() => {
		fetchAssets()
			.then((data) => {
				setAssets(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const handleSimulate = async (input: DCAInput) => {
		setSimulating(true);
		setError(null);
		try {
			const data = await simulateDCA(input);
			setResult(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Simulation failed');
		} finally {
			setSimulating(false);
		}
	};

	const handleAddComparison = async () => {
		if (!result) {
			return;
		}
		if (result.comparison) {
			setResult({ ...result, comparison: undefined });
			return;
		}
		setComparing(true);
		setError(null);
		try {
			const inputWithComparison = { ...result.input, compareWith: 'lump-sum' as const };
			const data = await simulateDCA(inputWithComparison);
			setResult(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Comparison failed');
		} finally {
			setComparing(false);
		}
	};

	if (loading) {
		return <p className="p-8">Loading...</p>;
	}

	return (
		<div className="min-h-screen bg-slate-100 dark:bg-gray-900">
			<header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 shadow-sm px-8 py-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">DCA Toolkit</h1>
				<ThemeToggle />
			</header>

			<main className="p-8">
				<div className="flex flex-col md:flex-row gap-8">
					<section className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
						<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Configuration</h2>
						<DCAForm assets={assets} onSubmit={handleSimulate} onAddComparison={handleAddComparison} canAddComparison={!!result && !result.comparison} hasResult={!!result} simulating={simulating} comparing={comparing} />
					</section>

					<section className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
						<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Results</h2>
						{error && <p className="text-red-600 dark:text-red-400">Error: {error}</p>}
						{!simulating && !result && !error && <p className="text-gray-500 dark:text-gray-400">Configure a simulation and click Simulate to see results.</p>}
						{result && (
							<>
								<DCAResults result={result} />
								<div className="mt-6">
									<h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">Evolution over time</h3>
									<DCAChart purchases={result.purchases} comparisonPurchases={result.comparison?.purchases} currency={result.input.currency} />
								</div>
							</>
						)}
					</section>
				</div>
			</main>
		</div>
	);
}

export default App;
