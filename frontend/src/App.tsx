import { useEffect, useState } from 'react';
import { fetchAssets } from './services/assets.service';
import { simulateDCA } from './services/dca.service';
import DCAForm from './components/DCAForm';
import DCAResults from './components/DCAResults';
import DCAChart from './components/DCAChart';
import type { AssetDefinition } from './types/asset.types';
import type { DCAInput, DCAResult } from './types/dca.types';

function App() {
	const [assets, setAssets] = useState<AssetDefinition[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<DCAResult | null>(null);
	const [simulating, setSimulating] = useState(false);

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

	if (loading) {
		return <p className="p-8">Loading...</p>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200 px-8 py-4">
				<h1 className="text-2xl font-bold text-gray-900">DCA Toolkit</h1>
			</header>

			<main className="p-8">
				<div className="flex flex-col md:flex-row gap-8">
					<section className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
						<h2 className="text-lg font-semibold mb-4">Configuration</h2>
						<DCAForm assets={assets} onSubmit={handleSimulate} />
					</section>

					<section className="w-full md:w-2/3 bg-white rounded-lg shadow p-6">
						<h2 className="text-lg font-semibold mb-4">Results</h2>
						{error && <p className="text-red-600">Error: {error}</p>}
						{simulating && <p className="text-gray-500">Simulating...</p>}
						{!simulating && !result && !error && <p className="text-gray-500">Configure a simulation and click Simulate to see results.</p>}
						{result && (
							<>
								<DCAResults result={result} />
								<div className="mt-6">
									<h3 className="text-md font-semibold mb-3">Evolution over time</h3>
									<DCAChart purchases={result.purchases} currency={result.input.currency} />
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
