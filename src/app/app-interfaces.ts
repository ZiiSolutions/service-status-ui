export interface ApiStatusResponse extends Array<ServiceStatusDetail> {}

export interface ServiceStatusDetail {
  name: string;
  isHealthy: boolean;
}
