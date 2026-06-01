import { get } from './api.client';
import type { AssetDefinition } from '../types/asset.types';

export async function fetchAssets(): Promise<AssetDefinition[]> {
	return get<AssetDefinition[]>('/assets');
}

