import { LOCAL_STORAGE_KEY } from "../../consts/localStorage";

export function getStorageScore(): number {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);

    return value ? Number(value) : 0;
}

export function saveStorageScore(score: number) {
    localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());
}
