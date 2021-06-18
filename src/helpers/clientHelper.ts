import { ApiClient } from './../services/apiClient';
import { ServiceFactory } from './../services/serviceFactory';

export function fClient(): ApiClient {
  return ServiceFactory.get<ApiClient>('api-client');
}

export function openTangleExplorer(params: any): void {
  window.open(tangleExplorerUrl(params));
}

export function tangleExplorerUrl(params: any): string {
  return 'https://explorer.iota.org/mainnet/addr/' + params;
}