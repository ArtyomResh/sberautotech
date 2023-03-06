declare module '*.inline.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

    export default content;
}

declare module '*.svg' {
    const content: string;

    export default content;
}

declare module '*.jpg' {
    const content: string;

    export default content;
}

declare module '*.jpeg' {
    const content: string;

    export default content;
}

declare module '*.png' {
    const content: string;

    export default content;
}

declare module '*.pdf' {
    const content: string;

    export default content;
}
