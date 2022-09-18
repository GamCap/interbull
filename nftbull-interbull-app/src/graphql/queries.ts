/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const queryCollectionEventBySymbol = /* GraphQL */ `
  query QueryCollectionEventBySymbol(
    $collection_symbol: String!
    $first: Int
    $after: String
  ) {
    queryCollectionEventBySymbol(
      collection_symbol: $collection_symbol
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryCollectionEvents = /* GraphQL */ `
  query QueryCollectionEvents(
    $collection_address: String!
    $chain: String!
    $after: String
    $first: Int
  ) {
    queryCollectionEvents(
      collection_address: $collection_address
      chain: $chain
      after: $after
      first: $first
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryUsersEthereumNFTs = /* GraphQL */ `
  query QueryUsersEthereumNFTs(
    $collection_address: String
    $user_address: String
    $after: String
  ) {
    queryUsersEthereumNFTs(
      collection_address: $collection_address
      user_address: $user_address
      after: $after
    ) {
      items {
        title
        token_uri_gateway
        token_uri_raw
        updated_at
        name
        image
        attributes
        media
        description
        token_id
        token_type
        address
        balance
      }
      nextToken
      totalCount
    }
  }
`;
export const queryInterbullNFTs = /* GraphQL */ `
  query QueryInterbullNFTs($collection_address: String) {
    queryInterbullNFTs(collection_address: $collection_address) {
      items {
        title
        token_uri_gateway
        token_uri_raw
        updated_at
        name
        image
        attributes
        media
        description
        token_id
        token_type
        address
        price
        payment_token
        listed
      }
      nextToken
      totalCount
    }
  }
`;
export const queryEthereumNFTs = /* GraphQL */ `
  query QueryEthereumNFTs(
    $collection_address: String!
    $after: String
    $first: Int
  ) {
    queryEthereumNFTs(
      collection_address: $collection_address
      after: $after
      first: $first
    ) {
      items {
        title
        token_uri_gateway
        token_uri_raw
        updated_at
        name
        image
        attributes
        media
        description
        token_id
        token_type
        address
      }
      nextToken
    }
  }
`;
export const getCollectionByCollectionSymbol = /* GraphQL */ `
  query GetCollectionByCollectionSymbol($collection_symbol: String) {
    getCollectionByCollectionSymbol(collection_symbol: $collection_symbol) {
      chain
      collection_address
      collection_logo
      collection_symbol
      contract_external_url
      created_date
      description
      discord_url
      featured_image_url
      instagram_username
      large_collection_logo
      looksrare_url
      name
      num_owners
      opensea_url
      project_website
      schema_name
      seven_day_average_price
      seven_day_change
      seven_day_sales
      seven_day_volume
      average_listing_price_eth_1d
      average_sale_price_eth_1d
      average_listing_price_pct_change_eth_1d
      average_sale_price_pct_change_eth_1d
      close_eth_1d
      high_eth_1d
      listing_count_1d
      listing_count_pct_change_1d
      low_eth_1d
      median_listing_price_eth_1d
      median_sale_price_eth_1d
      median_listing_price_pct_change_eth_1d
      median_sale_price_pct_change_eth_1d
      momentum_1d
      momentum_pct_change_1d
      open_eth_1d
      sale_count_1d
      sale_count_pct_change_1d
      unique_buyers_1d
      unique_listers_1d
      unique_sellers_1d
      unique_buyers_pct_change_1d
      unique_listers_pct_change_1d
      unique_sellers_pct_change_1d
      volume_eth_1d
      total_supply
      last_momentum
      twitter_username
      updated_at
    }
  }
`;
export const queryEthereumCollectionsBySevenDayVolume = /* GraphQL */ `
  query QueryEthereumCollectionsBySevenDayVolume($first: Int, $after: String) {
    queryEthereumCollectionsBySevenDayVolume(first: $first, after: $after) {
      items {
        chain
        collection_address
        collection_logo
        collection_symbol
        contract_external_url
        created_date
        description
        discord_url
        featured_image_url
        instagram_username
        large_collection_logo
        looksrare_url
        name
        num_owners
        opensea_url
        project_website
        schema_name
        seven_day_average_price
        seven_day_change
        seven_day_sales
        seven_day_volume
        average_listing_price_eth_1d
        average_sale_price_eth_1d
        average_listing_price_pct_change_eth_1d
        average_sale_price_pct_change_eth_1d
        close_eth_1d
        high_eth_1d
        listing_count_1d
        listing_count_pct_change_1d
        low_eth_1d
        median_listing_price_eth_1d
        median_sale_price_eth_1d
        median_listing_price_pct_change_eth_1d
        median_sale_price_pct_change_eth_1d
        momentum_1d
        momentum_pct_change_1d
        open_eth_1d
        sale_count_1d
        sale_count_pct_change_1d
        unique_buyers_1d
        unique_listers_1d
        unique_sellers_1d
        unique_buyers_pct_change_1d
        unique_listers_pct_change_1d
        unique_sellers_pct_change_1d
        volume_eth_1d
        total_supply
        last_momentum
        twitter_username
        updated_at
      }
      nextToken
    }
  }
`;
export const searchCollections = /* GraphQL */ `
  query SearchCollections($query: String) {
    searchCollections(query: $query) {
      chain
      collection_address
      collection_logo
      collection_symbol
      contract_external_url
      created_date
      description
      discord_url
      featured_image_url
      instagram_username
      large_collection_logo
      looksrare_url
      name
      num_owners
      opensea_url
      project_website
      schema_name
      seven_day_average_price
      seven_day_change
      seven_day_sales
      seven_day_volume
      average_listing_price_eth_1d
      average_sale_price_eth_1d
      average_listing_price_pct_change_eth_1d
      average_sale_price_pct_change_eth_1d
      close_eth_1d
      high_eth_1d
      listing_count_1d
      listing_count_pct_change_1d
      low_eth_1d
      median_listing_price_eth_1d
      median_sale_price_eth_1d
      median_listing_price_pct_change_eth_1d
      median_sale_price_pct_change_eth_1d
      momentum_1d
      momentum_pct_change_1d
      open_eth_1d
      sale_count_1d
      sale_count_pct_change_1d
      unique_buyers_1d
      unique_listers_1d
      unique_sellers_1d
      unique_buyers_pct_change_1d
      unique_listers_pct_change_1d
      unique_sellers_pct_change_1d
      volume_eth_1d
      total_supply
      last_momentum
      twitter_username
      updated_at
    }
  }
`;
export const getCollections = /* GraphQL */ `
  query GetCollections(
    $sort: AWSJSON
    $filters: AWSJSON
    $size: Int
    $from: Int
  ) {
    getCollections(sort: $sort, filters: $filters, size: $size, from: $from) {
      chain
      collection_address
      collection_logo
      collection_symbol
      contract_external_url
      created_date
      description
      discord_url
      featured_image_url
      instagram_username
      large_collection_logo
      looksrare_url
      name
      num_owners
      opensea_url
      project_website
      schema_name
      seven_day_average_price
      seven_day_change
      seven_day_sales
      seven_day_volume
      average_listing_price_eth_1d
      average_sale_price_eth_1d
      average_listing_price_pct_change_eth_1d
      average_sale_price_pct_change_eth_1d
      close_eth_1d
      high_eth_1d
      listing_count_1d
      listing_count_pct_change_1d
      low_eth_1d
      median_listing_price_eth_1d
      median_sale_price_eth_1d
      median_listing_price_pct_change_eth_1d
      median_sale_price_pct_change_eth_1d
      momentum_1d
      momentum_pct_change_1d
      open_eth_1d
      sale_count_1d
      sale_count_pct_change_1d
      unique_buyers_1d
      unique_listers_1d
      unique_sellers_1d
      unique_buyers_pct_change_1d
      unique_listers_pct_change_1d
      unique_sellers_pct_change_1d
      volume_eth_1d
      total_supply
      last_momentum
      twitter_username
      updated_at
    }
  }
`;
