import { RDS, StackContext } from 'sst/constructs';
export const PostgresStack = ({ stack }: StackContext) => {
  const PostgresDatabase = new RDS(stack, 'Database', {
    engine: 'postgresql10.14',
    defaultDatabaseName: 'kahootDb',
    scaling: {
      autoPause: true,
      minCapacity: 'ACU_2',
      maxCapacity: 'ACU_2',
    },
    migrations: 'services/migrations',
    types: "services/migrations/types.ts",
  });

  return {
    PostgresDatabase,
  };
};