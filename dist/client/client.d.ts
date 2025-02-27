import type { Order, CoinMetadata, SuiEvent, TransactionEffects, Unsubscribe, PaginatedTransactionResponse, SuiMoveFunctionArgType, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiMoveNormalizedStruct, SuiTransactionBlockResponse, PaginatedEvents, DevInspectResults, PaginatedCoins, SuiObjectResponse, DelegatedStake, CoinBalance, CoinSupply, Checkpoint, CommitteeInfo, DryRunTransactionBlockResponse, SuiSystemStateSummary, PaginatedObjectsResponse, ValidatorsApy, MoveCallMetrics, ObjectRead, ResolvedNameServiceNames, ProtocolConfig, EpochInfo, EpochPage, CheckpointPage, DynamicFieldPage, NetworkMetrics, AddressMetrics, AllEpochsAddressMetrics, DevInspectTransactionBlockParams, DryRunTransactionBlockParams, ExecuteTransactionBlockParams, GetAllBalancesParams, GetAllCoinsParams, GetBalanceParams, GetCheckpointParams, GetCheckpointsParams, GetCoinMetadataParams, GetCoinsParams, GetCommitteeInfoParams, GetDynamicFieldObjectParams, GetDynamicFieldsParams, GetMoveFunctionArgTypesParams, GetNormalizedMoveFunctionParams, GetNormalizedMoveModuleParams, GetNormalizedMoveModulesByPackageParams, GetNormalizedMoveStructParams, GetObjectParams, GetOwnedObjectsParams, GetProtocolConfigParams, GetStakesByIdsParams, GetStakesParams, GetTotalSupplyParams, GetTransactionBlockParams, MultiGetObjectsParams, MultiGetTransactionBlocksParams, QueryEventsParams, QueryTransactionBlocksParams, ResolveNameServiceAddressParams, ResolveNameServiceNamesParams, SubscribeEventParams, SubscribeTransactionParams, TryGetPastObjectParams } from './types/index';
import type { TransactionBlock } from '../builder/index';
import type { SuiTransport } from './http-transport';
import type { Keypair } from '../cryptography/index';
export interface PaginationArguments<Cursor> {
    /** Optional paging cursor */
    cursor?: Cursor;
    /** Maximum item returned per page */
    limit?: number | null;
}
export interface OrderArguments {
    order?: Order | null;
}
/**
 * Configuration options for the SuiClient
 * You must provide either a `url` or a `transport`
 */
export type SuiClientOptions = NetworkOrTransport;
export type NetworkOrTransport = {
    url: string;
    transport?: never;
} | {
    transport: SuiTransport;
    url?: never;
};
export declare class SuiClient {
    protected transport: SuiTransport;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param options configuration options for the API Client
     */
    constructor(options: SuiClientOptions);
    getRpcApiVersion(): Promise<string | undefined>;
    /**
     * Get all Coin<`coin_type`> objects owned by an address.
     */
    getCoins(input: GetCoinsParams): Promise<PaginatedCoins>;
    /**
     * Get all Coin objects owned by an address.
     */
    getAllCoins(input: GetAllCoinsParams): Promise<PaginatedCoins>;
    /**
     * Get the total coin balance for one coin type, owned by the address owner.
     */
    getBalance(input: GetBalanceParams): Promise<CoinBalance>;
    /**
     * Get the total coin balance for all coin types, owned by the address owner.
     */
    getAllBalances(input: GetAllBalancesParams): Promise<CoinBalance[]>;
    /**
     * Fetch CoinMetadata for a given coin type
     */
    getCoinMetadata(input: GetCoinMetadataParams): Promise<CoinMetadata | null>;
    /**
     *  Fetch total supply for a coin
     */
    getTotalSupply(input: GetTotalSupplyParams): Promise<CoinSupply>;
    /**
     * Invoke any RPC method
     * @param method the method to be invoked
     * @param args the arguments to be passed to the RPC request
     */
    call<T = unknown>(method: string, params: unknown[]): Promise<T>;
    /**
     * Get Move function argument types like read, write and full access
     */
    getMoveFunctionArgTypes(input: GetMoveFunctionArgTypesParams): Promise<SuiMoveFunctionArgType[]>;
    /**
     * Get a map from module name to
     * structured representations of Move modules
     */
    getNormalizedMoveModulesByPackage(input: GetNormalizedMoveModulesByPackageParams): Promise<SuiMoveNormalizedModules>;
    /**
     * Get a structured representation of Move module
     */
    getNormalizedMoveModule(input: GetNormalizedMoveModuleParams): Promise<SuiMoveNormalizedModule>;
    /**
     * Get a structured representation of Move function
     */
    getNormalizedMoveFunction(input: GetNormalizedMoveFunctionParams): Promise<SuiMoveNormalizedFunction>;
    /**
     * Get a structured representation of Move struct
     */
    getNormalizedMoveStruct(input: GetNormalizedMoveStructParams): Promise<SuiMoveNormalizedStruct>;
    /**
     * Get all objects owned by an address
     */
    getOwnedObjects(input: GetOwnedObjectsParams): Promise<PaginatedObjectsResponse>;
    /**
     * Get details about an object
     */
    getObject(input: GetObjectParams): Promise<SuiObjectResponse>;
    tryGetPastObject(input: TryGetPastObjectParams): Promise<ObjectRead>;
    /**
     * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
     */
    multiGetObjects(input: MultiGetObjectsParams): Promise<SuiObjectResponse[]>;
    /**
     * Get transaction blocks for a given query criteria
     */
    queryTransactionBlocks(input: QueryTransactionBlocksParams): Promise<PaginatedTransactionResponse>;
    getTransactionBlock(input: GetTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
    multiGetTransactionBlocks(input: MultiGetTransactionBlocksParams): Promise<SuiTransactionBlockResponse[]>;
    executeTransactionBlock(input: ExecuteTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
    signAndExecuteTransactionBlock({ transactionBlock, signer, ...input }: {
        transactionBlock: Uint8Array | TransactionBlock;
        signer: Keypair;
    } & Omit<ExecuteTransactionBlockParams, 'transactionBlock' | 'signature'>): Promise<SuiTransactionBlockResponse>;
    /**
     * Get total number of transactions
     */
    getTotalTransactionBlocks(): Promise<bigint>;
    /**
     * Getting the reference gas price for the network
     */
    getReferenceGasPrice(): Promise<bigint>;
    /**
     * Return the delegated stakes for an address
     */
    getStakes(input: GetStakesParams): Promise<DelegatedStake[]>;
    /**
     * Return the delegated stakes queried by id.
     */
    getStakesByIds(input: GetStakesByIdsParams): Promise<DelegatedStake[]>;
    /**
     * Return the latest system state content.
     */
    getLatestSuiSystemState(): Promise<SuiSystemStateSummary>;
    /**
     * Get events for a given query criteria
     */
    queryEvents(input: QueryEventsParams): Promise<PaginatedEvents>;
    /**
     * Subscribe to get notifications whenever an event matching the filter occurs
     */
    subscribeEvent(input: SubscribeEventParams & {
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: SuiEvent) => void;
    }): Promise<Unsubscribe>;
    subscribeTransaction(input: SubscribeTransactionParams & {
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: TransactionEffects) => void;
    }): Promise<Unsubscribe>;
    /**
     * Runs the transaction block in dev-inspect mode. Which allows for nearly any
     * transaction (or Move call) with any arguments. Detailed results are
     * provided, including both the transaction effects and any return values.
     */
    devInspectTransactionBlock(input: DevInspectTransactionBlockParams): Promise<DevInspectResults>;
    /**
     * Dry run a transaction block and return the result.
     */
    dryRunTransactionBlock(input: DryRunTransactionBlockParams): Promise<DryRunTransactionBlockResponse>;
    /**
     * Return the list of dynamic field objects owned by an object
     */
    getDynamicFields(input: GetDynamicFieldsParams): Promise<DynamicFieldPage>;
    /**
     * Return the dynamic field object information for a specified object
     */
    getDynamicFieldObject(input: GetDynamicFieldObjectParams): Promise<SuiObjectResponse>;
    /**
     * Get the sequence number of the latest checkpoint that has been executed
     */
    getLatestCheckpointSequenceNumber(): Promise<string>;
    /**
     * Returns information about a given checkpoint
     */
    getCheckpoint(input: GetCheckpointParams): Promise<Checkpoint>;
    /**
     * Returns historical checkpoints paginated
     */
    getCheckpoints(input: PaginationArguments<CheckpointPage['nextCursor']> & GetCheckpointsParams): Promise<CheckpointPage>;
    /**
     * Return the committee information for the asked epoch
     */
    getCommitteeInfo(input?: GetCommitteeInfoParams): Promise<CommitteeInfo>;
    getNetworkMetrics(): Promise<NetworkMetrics>;
    getAddressMetrics(): Promise<AddressMetrics>;
    getAllEpochAddressMetrics(input?: {
        descendingOrder?: boolean;
    }): Promise<AllEpochsAddressMetrics>;
    /**
     * Return the committee information for the asked epoch
     */
    getEpochs(input?: {
        descendingOrder?: boolean;
    } & PaginationArguments<EpochPage['nextCursor']>): Promise<EpochPage>;
    /**
     * Returns list of top move calls by usage
     */
    getMoveCallMetrics(): Promise<MoveCallMetrics>;
    /**
     * Return the committee information for the asked epoch
     */
    getCurrentEpoch(): Promise<EpochInfo>;
    /**
     * Return the Validators APYs
     */
    getValidatorsApy(): Promise<ValidatorsApy>;
    getChainIdentifier(): Promise<string>;
    resolveNameServiceAddress(input: ResolveNameServiceAddressParams): Promise<string | null>;
    resolveNameServiceNames(input: ResolveNameServiceNamesParams): Promise<ResolvedNameServiceNames>;
    getProtocolConfig(input?: GetProtocolConfigParams): Promise<ProtocolConfig>;
    /**
     * Wait for a transaction block result to be available over the API.
     * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
     * be available via the API.
     * This currently polls the `getTransactionBlock` API to check for the transaction.
     */
    waitForTransactionBlock({ signal, timeout, pollInterval, ...input }: {
        /** An optional abort signal that can be used to cancel */
        signal?: AbortSignal;
        /** The amount of time to wait for a transaction block. Defaults to one minute. */
        timeout?: number;
        /** The amount of time to wait between checks for the transaction block. Defaults to 2 seconds. */
        pollInterval?: number;
    } & Parameters<SuiClient['getTransactionBlock']>[0]): Promise<SuiTransactionBlockResponse>;
}
//# sourceMappingURL=client.d.ts.map