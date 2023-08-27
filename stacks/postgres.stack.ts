import { RDS, StackContext } from 'sst/constructs';
export const PostgresStack = ({ stack }: StackContext) => {
  const PostgresDatabase = new RDS(stack, 'Database', {
    engine: 'postgresql11.13',
    defaultDatabaseName: 'kahootDb',
    scaling: {
      autoPause: true,
      minCapacity: 'ACU_2',
      maxCapacity: 'ACU_2',
    },
    migrations: 'packages/core/lib/db/migrations',
    types: "packages/core/lib/db/types.ts",
  });

  return {
    PostgresDatabase,
  };
};