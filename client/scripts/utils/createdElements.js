export const elements = {
    body: null,
};

export const assignElements = () => {
    const assignBody = () => {
        elements.body = document.querySelector('body');
    };
    assignBody();
};
