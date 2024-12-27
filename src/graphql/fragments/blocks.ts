export const HOMEPAGE_BLOCKS_FRAGMENT = `
  blocks {
    id
    sort
    collection
    hide_block
    item {
      ... on block_hero {
        file {
          id
          title
          type
        }
        content
      }
      ... on block_invest_in_your_purpose {
        id
        title
        content
        image {
          id
          title
          type
        }
        floating_image {
          id
          title
          type
        }
      }
      ... on block_independent_communications_firm {
        id
        title
        content
        floating_image {
          id
          title
          type
        }
      }
      ... on block_communication_is_purpose {
        id
        title
        content_one
        content_two
        background_file {
          id
          title
          type
        }
      }
      ... on block_marquee {
        id
        title
        background_color
        floating_image {
          id
          title
          type
        }
        background_file {
          id
          title
          type
        }
      }
      ... on block_service {
        id
        title
        background_color
        services {
          id
          sort
          title
          background_color
          items {
            id
            sort
            title
          }
          background_file {
            id
            title
            type
          }
        }
      }
      ... on block_office {
        id
        content
        background_color
        floating_image {
          id
          title
          type
        }
        offices {
          id
          sort
          name
          address
          background_file {
            id
            title
            type
          }
          featured_image {
            id
            title
            type
          }
        }
      }
      ... on block_brand {
        id
        content
        background_color
        floating_image {
          id
          title
          type
        }
        brands {
          id
          sort
          name
          logo {
            id
            title
            type
          }
        }
      }
      ... on block_form {
        id
        headline
        title
        floating_image {
          id
          title
          type
        }
        form {
          id
          key
          on_success
          redirect_url
          schema
          sort
          status
          submit_label
          success_message
          title
        }
      }
      ... on block_footer {
        id
        title
        content
        background_color
        background_file {
          id
          title
          type
        }
        social_medias {
          id
          sort
          text
          link
        }
      }
      ... on block_richtext {
        id
        title
        headline
        content
        alignment
      }
    }
  }
`;
