import { createI18n } from 'vue-i18n';
import enUS from './en-US.json';
import type { NestedKeys } from '@/shared/types';

type Keys = NestedKeys<typeof enUS>;

export const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: { 'en-US': enUS }
});

export function t(key: Keys, options?: any) {
  return i18n.global.t(key, options);
}
