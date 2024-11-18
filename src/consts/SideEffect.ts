export const SideEffect = {
    IS_INVERTED_CONTROLS: "isInvertedControls",
    SPEED: "speed",
} as const;

export type SideEffect = (typeof SideEffect)[keyof typeof SideEffect];
