import { useEffect, useState } from 'react';
import { fetchAssets } from './services/assets.service';
import type { AssetDefinition } from './types/asset.types';

function App() {
	const [assets, setAssets] = useState<AssetDefinition[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div>
			<h1>DCA Toolkit</h1>
			<h2>Available assets</h2>
			<ul>
				{assets.map((asset) => (
					<li key={asset.id}>
						{asset.name} ({asset.category})
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
