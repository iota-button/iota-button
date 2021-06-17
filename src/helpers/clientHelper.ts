import { ApiClient } from './../services/apiClient';
import { ServiceFactory } from './../services/serviceFactory';

export function fClient(): ApiClient {
  return ServiceFactory.get<ApiClient>('api-client');
}

export function openTangleExplorer(url: string): void {
  window.open('https://explorer.iota.org/mainnet/addr/' + url);
}