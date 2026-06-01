import { post } from './api.client';
import type { DCAInput, DCAResult } from '../types/dca.types';

export async function simulateDCA(input: DCAInput): Promise<DCAResult> {
	return post<DCAResult>('/dca', input);
}
