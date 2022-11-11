import { NextFunction, Router, Request, Response } from 'express';
import { bodyValidationMiddleware } from '@/middlewares/validation-middleware';
import { bodyValidator } from '@/validators/ConverterSchema';
import { converterCurrencyController } from './modules/ConverterCurrency';

const router = Router();

router.post(
  '/converter',
  [bodyValidationMiddleware(bodyValidator)],
  (req: Request, res: Response, next: NextFunction) => {
    return converterCurrencyController.handle(req, res, next);
  },
);

export default router;
