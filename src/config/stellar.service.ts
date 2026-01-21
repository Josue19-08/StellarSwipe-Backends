import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StellarConfigService {
  constructor(private configService: ConfigService) {}

  get network(): string {
    return this.configService.get('stellar.network');
  }

  get horizonUrl(): string {
    return this.configService.get('stellar.horizonUrl');
  }

  get sorobanRpcUrl(): string {
    return this.configService.get('stellar.sorobanRpcUrl');
  }

  get networkPassphrase(): string {
    return this.configService.get('stellar.networkPassphrase');
  }

  get apiTimeout(): number {
    return this.configService.get('stellar.apiTimeout');
  }

  get maxRetries(): number {
    return this.configService.get('stellar.maxRetries');
  }

  isTestnet(): boolean {
    return this.network === 'testnet';
  }

  isMainnet(): boolean {
    return this.network === 'mainnet';
  }
}
