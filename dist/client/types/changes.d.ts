import type { SuiObjectChange } from './generated';
export type SuiObjectChangePublished = Extract<SuiObjectChange, {
    type: 'published';
}>;
export type SuiObjectChangeTransferred = Extract<SuiObjectChange, {
    type: 'transferred';
}>;
export type SuiObjectChangeMutated = Extract<SuiObjectChange, {
    type: 'mutated';
}>;
export type SuiObjectChangeDeleted = Extract<SuiObjectChange, {
    type: 'deleted';
}>;
export type SuiObjectChangeWrapped = Extract<SuiObjectChange, {
    type: 'wrapped';
}>;
export type SuiObjectChangeCreated = Extract<SuiObjectChange, {
    type: 'created';
}>;
//# sourceMappingURL=changes.d.ts.map