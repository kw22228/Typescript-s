import { ValidateRule } from './types';

export const RequireRule: ValidateRule = {
    rule: /.+/,
    match: true,
    message: '필수 입력 항목입니다.',
};
