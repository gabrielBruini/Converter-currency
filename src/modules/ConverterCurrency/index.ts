import { ConverterCurrencyController } from './ConverterCurrencyController';
import { ConverterCurrencyService } from './ConverterCurrencyService';

const converterCurrencyService = new ConverterCurrencyService();
// databaseIntegration,
const converterCurrencyController = new ConverterCurrencyController(
  converterCurrencyService,
);

export { converterCurrencyService, converterCurrencyController };
