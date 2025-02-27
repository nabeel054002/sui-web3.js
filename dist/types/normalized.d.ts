import type { Infer } from 'superstruct';
export type SuiMoveFunctionArgTypesResponse = Infer<typeof SuiMoveFunctionArgType>[];
export declare const SuiMoveFunctionArgType: import("superstruct").Struct<string | {
    Object: string;
}, null>;
export declare const SuiMoveFunctionArgTypes: import("superstruct").Struct<(string | {
    Object: string;
})[], import("superstruct").Struct<string | {
    Object: string;
}, null>>;
export type SuiMoveFunctionArgTypes = Infer<typeof SuiMoveFunctionArgTypes>;
export declare const SuiMoveModuleId: import("superstruct").Struct<{
    name: string;
    address: string;
}, {
    address: import("superstruct").Struct<string, null>;
    name: import("superstruct").Struct<string, null>;
}>;
export type SuiMoveModuleId = Infer<typeof SuiMoveModuleId>;
export declare const SuiMoveVisibility: import("superstruct").Struct<"Private" | "Public" | "Friend", null>;
export type SuiMoveVisibility = Infer<typeof SuiMoveVisibility>;
export declare const SuiMoveAbilitySet: import("superstruct").Struct<{
    abilities: string[];
}, {
    abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
}>;
export type SuiMoveAbilitySet = Infer<typeof SuiMoveAbilitySet>;
export declare const SuiMoveStructTypeParameter: import("superstruct").Struct<{
    constraints: {
        abilities: string[];
    };
    isPhantom: boolean;
}, {
    constraints: import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    isPhantom: import("superstruct").Struct<boolean, null>;
}>;
export type SuiMoveStructTypeParameter = Infer<typeof SuiMoveStructTypeParameter>;
export declare const SuiMoveNormalizedTypeParameterType: import("superstruct").Struct<{
    TypeParameter: number;
}, {
    TypeParameter: import("superstruct").Struct<number, null>;
}>;
export type SuiMoveNormalizedTypeParameterType = Infer<typeof SuiMoveNormalizedTypeParameterType>;
export type SuiMoveNormalizedType = string | SuiMoveNormalizedTypeParameterType | {
    Reference: SuiMoveNormalizedType;
} | {
    MutableReference: SuiMoveNormalizedType;
} | {
    Vector: SuiMoveNormalizedType;
} | SuiMoveNormalizedStructType;
export declare const MoveCallMetric: import("superstruct").Struct<[{
    function: string;
    package: string;
    module: string;
}, string], null>;
export type MoveCallMetric = Infer<typeof MoveCallMetric>;
export declare const MoveCallMetrics: import("superstruct").Struct<{
    rank3Days: [{
        function: string;
        package: string;
        module: string;
    }, string][];
    rank7Days: [{
        function: string;
        package: string;
        module: string;
    }, string][];
    rank30Days: [{
        function: string;
        package: string;
        module: string;
    }, string][];
}, {
    rank3Days: import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string][], import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string], null>>;
    rank7Days: import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string][], import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string], null>>;
    rank30Days: import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string][], import("superstruct").Struct<[{
        function: string;
        package: string;
        module: string;
    }, string], null>>;
}>;
export type MoveCallMetrics = Infer<typeof MoveCallMetrics>;
export declare const SuiMoveNormalizedType: import("superstruct").Struct<SuiMoveNormalizedType, null>;
export type SuiMoveNormalizedStructType = {
    Struct: {
        address: string;
        module: string;
        name: string;
        typeArguments: SuiMoveNormalizedType[];
    };
};
export declare const SuiMoveNormalizedStructType: import("superstruct").Struct<SuiMoveNormalizedStructType, null>;
export declare const SuiMoveNormalizedFunction: import("superstruct").Struct<{
    visibility: "Private" | "Public" | "Friend";
    isEntry: boolean;
    typeParameters: {
        abilities: string[];
    }[];
    parameters: SuiMoveNormalizedType[];
    return: SuiMoveNormalizedType[];
}, {
    visibility: import("superstruct").Struct<"Private" | "Public" | "Friend", null>;
    isEntry: import("superstruct").Struct<boolean, null>;
    typeParameters: import("superstruct").Struct<{
        abilities: string[];
    }[], import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>>;
    parameters: import("superstruct").Struct<SuiMoveNormalizedType[], import("superstruct").Struct<SuiMoveNormalizedType, null>>;
    return: import("superstruct").Struct<SuiMoveNormalizedType[], import("superstruct").Struct<SuiMoveNormalizedType, null>>;
}>;
export type SuiMoveNormalizedFunction = Infer<typeof SuiMoveNormalizedFunction>;
export declare const SuiMoveNormalizedField: import("superstruct").Struct<{
    type: SuiMoveNormalizedType;
    name: string;
}, {
    name: import("superstruct").Struct<string, null>;
    type: import("superstruct").Struct<SuiMoveNormalizedType, null>;
}>;
export type SuiMoveNormalizedField = Infer<typeof SuiMoveNormalizedField>;
export declare const SuiMoveNormalizedStruct: import("superstruct").Struct<{
    fields: {
        type: SuiMoveNormalizedType;
        name: string;
    }[];
    abilities: {
        abilities: string[];
    };
    typeParameters: {
        constraints: {
            abilities: string[];
        };
        isPhantom: boolean;
    }[];
}, {
    abilities: import("superstruct").Struct<{
        abilities: string[];
    }, {
        abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
    }>;
    typeParameters: import("superstruct").Struct<{
        constraints: {
            abilities: string[];
        };
        isPhantom: boolean;
    }[], import("superstruct").Struct<{
        constraints: {
            abilities: string[];
        };
        isPhantom: boolean;
    }, {
        constraints: import("superstruct").Struct<{
            abilities: string[];
        }, {
            abilities: import("superstruct").Struct<string[], import("superstruct").Struct<string, null>>;
        }>;
        isPhantom: import("superstruct").Struct<boolean, null>;
    }>>;
    fields: import("superstruct").Struct<{
        type: SuiMoveNormalizedType;
        name: string;
    }[], import("superstruct").Struct<{
        type: SuiMoveNormalizedType;
        name: string;
    }, {
        name: import("superstruct").Struct<string, null>;
        type: import("superstruct").Struct<SuiMoveNormalizedType, null>;
    }>>;
}>;
export type SuiMoveNormalizedStruct = Infer<typeof SuiMoveNormalizedStruct>;
export declare const SuiMoveNormalizedModule: import("superstruct").Struct<{
    name: string;
    address: string;
    fileFormatVersion: number;
    friends: {
        name: string;
        address: string;
    }[];
    structs: Record<string, {
        fields: {
            type: SuiMoveNormalizedType;
            name: string;
        }[];
        abilities: {
            abilities: string[];
        };
        typeParameters: {
            constraints: {
                abilities: string[];
            };
            isPhantom: boolean;
        }[];
    }>;
    exposedFunctions: Record<string, {
        visibility: "Private" | "Public" | "Friend";
        isEntry: boolean;
        typeParameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return: SuiMoveNormalizedType[];
    }>;
}, {
    fileFormatVersion: import("superstruct").Struct<number, null>;
    address: import("superstruct").Struct<string, null>;
    name: import("superstruct").Struct<string, null>;
    friends: import("superstruct").Struct<{
        name: string;
        address: string;
    }[], import("superstruct").Struct<{
        name: string;
        address: string;
    }, {
        address: import("superstruct").Struct<string, null>;
        name: import("superstruct").Struct<string, null>;
    }>>;
    structs: import("superstruct").Struct<Record<string, {
        fields: {
            type: SuiMoveNormalizedType;
            name: string;
        }[];
        abilities: {
            abilities: string[];
        };
        typeParameters: {
            constraints: {
                abilities: string[];
            };
            isPhantom: boolean;
        }[];
    }>, null>;
    exposedFunctions: import("superstruct").Struct<Record<string, {
        visibility: "Private" | "Public" | "Friend";
        isEntry: boolean;
        typeParameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return: SuiMoveNormalizedType[];
    }>, null>;
}>;
export type SuiMoveNormalizedModule = Infer<typeof SuiMoveNormalizedModule>;
export declare const SuiMoveNormalizedModules: import("superstruct").Struct<Record<string, {
    name: string;
    address: string;
    fileFormatVersion: number;
    friends: {
        name: string;
        address: string;
    }[];
    structs: Record<string, {
        fields: {
            type: SuiMoveNormalizedType;
            name: string;
        }[];
        abilities: {
            abilities: string[];
        };
        typeParameters: {
            constraints: {
                abilities: string[];
            };
            isPhantom: boolean;
        }[];
    }>;
    exposedFunctions: Record<string, {
        visibility: "Private" | "Public" | "Friend";
        isEntry: boolean;
        typeParameters: {
            abilities: string[];
        }[];
        parameters: SuiMoveNormalizedType[];
        return: SuiMoveNormalizedType[];
    }>;
}>, null>;
export type SuiMoveNormalizedModules = Infer<typeof SuiMoveNormalizedModules>;
export declare function extractMutableReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractStructTag(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedStructType | undefined;
//# sourceMappingURL=normalized.d.ts.map