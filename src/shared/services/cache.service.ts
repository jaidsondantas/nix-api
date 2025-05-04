import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.cacheManager.get(key);
  }
}
