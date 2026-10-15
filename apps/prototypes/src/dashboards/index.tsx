import type { ReactElement } from 'react';
import {
  Dashboard01,
  Dashboard02,
  Dashboard04,
  Dashboard05,
  Dashboard17,
  Dashboard18,
} from './analytics';
import { Dashboard06, Dashboard07, Dashboard08, Dashboard09 } from './customers';
import {
  Dashboard12,
  Dashboard13,
  Dashboard14,
  Dashboard15,
  Dashboard16,
  Dashboard19,
} from './finance';
import { Dashboard03, Dashboard10, Dashboard11 } from './sales';

/** Route id → dashboard page. */
export const dashboardPages: Record<string, () => ReactElement> = {
  '01': Dashboard01,
  '02': Dashboard02,
  '03': Dashboard03,
  '04': Dashboard04,
  '05': Dashboard05,
  '06': Dashboard06,
  '07': Dashboard07,
  '08': Dashboard08,
  '09': Dashboard09,
  '10': Dashboard10,
  '11': Dashboard11,
  '12': Dashboard12,
  '13': Dashboard13,
  '14': Dashboard14,
  '15': Dashboard15,
  '16': Dashboard16,
  '17': Dashboard17,
  '18': Dashboard18,
  '19': Dashboard19,
};
