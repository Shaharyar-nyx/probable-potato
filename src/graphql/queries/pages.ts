import { gql } from "@apollo/client";

import { HOMEPAGE_BLOCKS_FRAGMENT } from "../fragments/blocks";

export const GET_HOMEPAGE = gql`
  query DirectusPagesByPerma($permalink: String) {
    pages(filter: { permalink: { _eq: $permalink } }) {
      status
      title
      permalink
      seo {
        canonical_url
        id
        meta_description
        no_follow
        no_index
        sitemap_change_frequency
        sitemap_priority
        title
        image {
          id
          title
          type
        }
      }
     ${HOMEPAGE_BLOCKS_FRAGMENT}
    }
  }
`;
