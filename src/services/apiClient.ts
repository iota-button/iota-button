import { FetchHelper } from "../helpers/fetchHelper";
import { IMessageDetailsRequest } from "../interfaces/api/chrysalis/IMessageDetailsRequest";
import { IMessageDetailsResponse } from "../interfaces/api/chrysalis/IMessageDetailsResponse";
import { IMilestoneDetailsRequest } from "../interfaces/api/chrysalis/IMilestoneDetailsRequest";
import { IMilestoneDetailsResponse } from "../interfaces/api/chrysalis/IMilestoneDetailsResponse";
import { IOutputDetailsRequest } from "../interfaces/api/chrysalis/IOutputDetailsRequest";
import { IOutputDetailsResponse } from "../interfaces/api/chrysalis/IOutputDetailsResponse";
import { ISearchRequest } from "../interfaces/api/chrysalis/ISearchRequest";
import { ISearchResponse } from "../interfaces/api/chrysalis/ISearchResponse";
import { ICurrenciesResponse } from "../interfaces/api/ICurrenciesResponse";
import { IMarketGetRequest } from "../interfaces/api/IMarketGetRequest";
import { IMarketGetResponse } from "../interfaces/api/IMarketGetResponse";
import { IMilestonesGetRequest } from "../interfaces/api/IMilestonesGetRequest";
import { IMilestonesGetResponse } from "../interfaces/api/IMilestonesGetResponse";
import { INetworkGetResponse } from "../interfaces/api/INetworkGetResponse";
import { IResponse } from "../interfaces/api/IResponse";
import { IAddressGetRequest } from "../interfaces/api/og/IAddressGetRequest";
import { IAddressGetResponse } from "../interfaces/api/og/IAddressGetResponse";
import { ITransactionActionRequest } from "../interfaces/api/og/ITransactionActionRequest";
import { ITransactionActionResponse } from "../interfaces/api/og/ITransactionActionResponse";
import { ITransactionsGetRequest } from "../interfaces/api/og/ITransactionsGetRequest";
import { ITransactionsGetResponse } from "../interfaces/api/og/ITransactionsGetResponse";
import { ITrytesRetrieveRequest } from "../interfaces/api/og/ITrytesRetrieveRequest";
import { ITrytesRetrieveResponse } from "../interfaces/api/og/ITrytesRetrieveResponse";
import { IStatsGetRequest } from "../interfaces/api/stats/IStatsGetRequest";
import { IStatsGetResponse } from "../interfaces/api/stats/IStatsGetResponse";

/**
 * Class to handle api communications.
 */
export class ApiClient {
    /**
     * The endpoint for performing communications.
     */
    private readonly _endpoint: string;

    /**
     * Create a new instance of ApiClient.
     * @param endpoint The endpoint for the api.
     */
    constructor(endpoint: string) {
        this._endpoint = endpoint;
    }

    /**
     * Perform a request to get the networks.
     * @returns The response from the request.
     */
    public async networks(): Promise<INetworkGetResponse> {
        return this.callApi<unknown, INetworkGetResponse>(
            "networks",
            "get"
        );
    }

    /**
     * Perform a request to get the currency information.
     * @returns The response from the request.
     */
    public async currencies(): Promise<ICurrenciesResponse> {
        return this.callApi<unknown, ICurrenciesResponse>(
            "currencies",
            "get"
        );
    }

    /**
     * Find transactions from the tangle.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async transactionsGet(request: ITransactionsGetRequest): Promise<ITransactionsGetResponse> {
        const { network, hash, ...rest } = request;

        return this.callApi<unknown, ITransactionsGetResponse>(
            `transactions/${network}/${hash}/${FetchHelper.urlParams(rest)}`,
            "get"
        );
    }

    /**
     * Get trytes from the tangle.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async trytesRetrieve(request: ITrytesRetrieveRequest): Promise<ITrytesRetrieveResponse> {
        const { network, ...rest } = request;

        return this.callApi<unknown, ITransactionsGetResponse>(
            `trytes/${network}`,
            "post",
            rest
        );
    }

    /**
     * Perform tangle operation on hash.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async transactionAction(request: ITransactionActionRequest): Promise<ITransactionActionResponse> {
        return this.callApi<unknown, ITransactionActionResponse>(
            `transactions/${request.network}/${request.hash}/action/${request.action}`,
            "get"
        );
    }

    /**
     * Perform tangle operation on address.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async addressGet(request: IAddressGetRequest): Promise<IAddressGetResponse> {
        return this.callApi<unknown, IAddressGetResponse>(
            `address/${request.network}/${request.hash}`,
            "get"
        );
    }

    /**
     * Get milestones from the tangle.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async milestonesGet(request: IMilestonesGetRequest): Promise<IMilestonesGetResponse> {
        return this.callApi<unknown, IMilestonesGetResponse>(
            `milestones/${request.network}`,
            "get"
        );
    }

    /**
     * Perform a request to get the market data information.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async marketGet(request: IMarketGetRequest): Promise<IMarketGetResponse> {
        return this.callApi<unknown, IMarketGetResponse>(
            `market/${request.currency}`,
            "get"
        );
    }

    /**
     * Find items from the tangle.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async search(request: ISearchRequest): Promise<ISearchResponse> {
        return this.callApi<unknown, ISearchResponse>(
            `search/${request.network}/${request.query}${request.cursor ? `?cursor=${request.cursor}` : ""}`,
            "get"
        );
    }

    /**
     * Get the message details.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async messageDetails(request: IMessageDetailsRequest): Promise<IMessageDetailsResponse> {
        return this.callApi<unknown, IMessageDetailsResponse>(
            `message/${request.network}/${request.messageId}`,
            "get"
        );
    }

    /**
     * Get the output details.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async outputDetails(request: IOutputDetailsRequest): Promise<IOutputDetailsResponse> {
        return this.callApi<unknown, IOutputDetailsResponse>(
            `output/${request.network}/${request.outputId}`,
            "get"
        );
    }

    /**
     * Get the milestone details.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async milestoneDetails(request: IMilestoneDetailsRequest): Promise<IMilestoneDetailsResponse> {
        return this.callApi<unknown, IMilestoneDetailsResponse>(
            `milestone/${request.network}/${request.milestoneIndex}`,
            "get"
        );
    }

    /**
     * Get the stats.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async stats(request: IStatsGetRequest): Promise<IStatsGetResponse> {
        return this.callApi<unknown, IStatsGetResponse>(
            `stats/${request.network}?includeHistory=${request.includeHistory ? "true" : "false"}`,
            "get"
        );
    }

    /**
     * Perform a request to get the networks.
     * @param path The path to send the request.
     * @param method The method for sending the request.
     * @param request The request to send.
     * @param timeout The timeout to use.
     * @returns The response from the request.
     */
    private async callApi<U, T extends IResponse>(
        path: string,
        method: "get" | "post" | "put" | "delete",
        request?: U,
        timeout?: number): Promise<T> {
        let response: T;

        try {
            response = await FetchHelper.json<U, T>(
                this._endpoint,
                path,
                method,
                request,
                undefined,
                timeout
            );
        } catch (err) {
            response = {
                error: `There was a problem communicating with the API.\n${err}`
            } as T;
        }

        return response;
    }
}
