import { gql } from "@apollo/client";

export const QUERY_FOOTER_DIRECTUS = gql`
  query DirectusFooter {
    navigation {
      id
      title
      items {
        title
        url
        page {
          permalink
          title
        }
        has_children
        children {
          title
          url
        }
      }
      blocks {
        id
        item {
          ... on block_form {
            id
            title
            form {
              id
              forms_id {
                id
                key
                submit_label
                title
              }
            }
          }
        }
        collection
      }
    }
  }
`;

export const GET_MAIN_NAV = gql`
  query DirectusPagesByPerma {
    navigation(filter: { id: { _eq: "main" } }) {
      id
      status
      title
      logo_default {
        id
        title
        type
      }
      logo_on_hover {
        id
        title
        type
      }
      background_file {
        id
        title
        type
      }
      items {
        icon
        id
        open_in_new_tab
        sort
        title
        type
        url
        label
      }
      copyright
      privacy_policy
      social_medias {
        id
        sort
        text
        link
      }
    }
  }
`;

export const GET_FOOTER_NAV = gql`
  query DirectusPagesByPerma {
    navigation(filter: { id: { _eq: "footer" } }) {
      id
      status
      title
      logo_default {
        id
        title
        type
      }
      logo_on_hover {
        id
        title
        type
      }
      background_file {
        id
        title
        type
      }
      items {
        icon
        id
        open_in_new_tab
        sort
        title
        type
        url
        label
      }
      copyright
      privacy_policy
      social_medias {
        id
        sort
        text
        link
      }
    }
  }
`;
