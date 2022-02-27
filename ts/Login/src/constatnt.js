export const RequireRule = {
    rule: /.+/,
    match: true,
    message: '필수 입력 사항입니다.',
};

export const CantContainWhitespace = {
    rule: /\s/,
    match: false,
    message: '공백을 포함할 수 없습니다.',
};

export const CantStartNumber = {
    rule: /^\d/,
    match: false,
    message: '숫자로 시작할 수 없습니다.',
};

export const MinimumLengthLimit = limit => {
    return {
        rule: new RegExp(`(.){${limit}}`),
        match: true,
        message: `최소한 ${limit}글자 이상 이어야 합니다.`,
    };
};
