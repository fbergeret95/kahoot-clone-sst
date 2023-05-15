export const PROD_ENV = 'production';
export const LOCAL_ENV = 'dev';

export const isProduction = (): boolean => process.env.NODE_ENV === PROD_ENV;
export const env : string = isProduction() ? PROD_ENV : LOCAL_ENV;
