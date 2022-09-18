/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollectionEvent = /* GraphQL */ `
  subscription OnCreateCollectionEvent($collection_address: String) {
    onCreateCollectionEvent(collection_address: $collection_address) {
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
export const onEvent = /* GraphQL */ `
  subscription OnEvent {
    onEvent {
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
