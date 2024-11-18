import { PositionSchema } from "../../typings/PositionSchema";

export function isSnakeSelfCollision(
    positions: PositionSchema[],
    position: PositionSchema,
) {
    return positions.some(
        (part) => part.x === position.x && part.y === position.y,
    );
}
