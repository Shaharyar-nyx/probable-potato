import { gql } from "@apollo/client";

import { BLOCKS_FRAGMENT } from "../fragments/blocks";

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String) {
     pages(filter: { slug: { _eq: $slug } }) {
      data {
        attributes {
          title
          slug
          publishedAt
          seo {
            title
            meta_description
            canonical_url
            no_follow
            no_index
            sitemap_frequency
            sitemap_priority
            keywords
            og_image {
              data {
                attributes {
                  name
                  alternativeText
                  mime
                  url
                }
              }
            }
          }
          ${BLOCKS_FRAGMENT}
        }
      }
    }
  }
`;
