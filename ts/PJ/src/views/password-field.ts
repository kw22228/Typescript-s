import template from './password-field.template';

enum StrongLevel {
    None = 0,
    Light,
    Medium,
    Heavy,
}
const StrongMessage: [string, string, string, string] = [
    '금지된 수준',
    '심각한 수준',
    '보통 수준',
    '강력한 암호,',
];

type Props = {
    id: string;
    label: string;
    text?: string;
    require?: boolean;
    placeholder?: string;
    strong?: StrongLevel;
};

const DefaultProps: Props = {
    id: '',
    label: 'label',
    text: '',
    require: true,
    placeholder: '',
    strong: StrongLevel.None,
};
export default class PasswordField {
    private template = template;
    private container: string;
    private data: Props;

    constructor(container: string, data: Props) {
        this.container = container;
        this.data = { ...DefaultProps, ...data };
    }
}
