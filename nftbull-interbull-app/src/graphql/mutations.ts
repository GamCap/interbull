/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollectionEvent = /* GraphQL */ `
  mutation CreateCollectionEvent($input: CreateCollectionEventInput!) {
    createCollectionEvent(input: $input) {
      chain
      source
      collection_address
      token_id
      event_type
      timestamp
      auction_type
      price
      start_time
      end_time
      payment_symbol
      from_address
      to_address
      hash
      total_price
      starting_price
      ending_price
    }
  }
`;
