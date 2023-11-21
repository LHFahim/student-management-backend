import { plainToClass } from 'class-transformer';
import { IsDefined, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  @IsString({ message: 'Invalid SECRET_KEY' })
  SECRET_KEY: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
