import { NextFunction, Request, Response } from 'express';
import { ConverterCurrencyService } from './ConverterCurrencyService';

// interface response {
//   message: string;
//   to: string;
//   from: string;
//   amount: string;
// }

export class ConverterCurrencyController {
  constructor(private converterCurrencyService: ConverterCurrencyService) {}
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { to, from, amount } = req.body;

      const service = await this.converterCurrencyService.converterCurrency(
        to,
        from,
        amount,
      );
      return res.status(200).json({
        to: service.query.to,
        from: service.query.from,
        amount: service.query.amount,
        result: service.result,
      });
    } catch (error) {
      next(error);
    }
  }
}
