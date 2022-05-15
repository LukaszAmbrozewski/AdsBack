import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {

}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
            //Gdy błąd jest nieznaznago pochodzenia (nie jest przez nas zdefiniowany) to wyświeltalmy użytkownikowi zeby spróbował później żeby nie wyciekły żadne dane.
            message: err instanceof ValidationError ? err.message : 'Sorry, please try again later.',
        });
}
