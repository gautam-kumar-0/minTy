// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const quotesApi = createApi({
	reducerPath: "quotesApi",
	baseQuery: fetchBaseQuery({baseUrl: "https://localhost:3000/"}),
	endpoints: (builder) => ({
		getQuote: builder.query({
			query: () => "quotes",
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetQuoteQuery} = quotesApi;
