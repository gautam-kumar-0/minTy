// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const quotesApi = createApi({
	reducerPath: "quotesApi",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/"}),
	endpoints: (builder) => ({
		getQuotes: builder.query({
			query: (quotes) => `${quotes || "quotes"}`,
			keepUnusedDataFor: 0,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetQuotesQuery, useLazyGetQuotesQuery} = quotesApi;
