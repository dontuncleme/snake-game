import { PositionSchema } from "../../typings/PositionSchema";

export function isCollision(p1: PositionSchema, p2: PositionSchema) {
    return p1.x === p2.x && p1.y === p2.y;
}
