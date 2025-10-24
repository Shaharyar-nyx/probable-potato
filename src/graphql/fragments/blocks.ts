export const BLOCKS_FRAGMENT = `
  blocks {
      ... on ComponentBlocksHeroSection {
          collection
          title
          headline
          content
          featured_image {
              data {
                  attributes {
                      name
                      alternativeText
                      mime
                      size
                      url
                  }
              }
          }
          cta_text
          cta_url
          cta_modal
          cta_page {
              data {
                  attributes {
                      title
                      slug
                  }
              }
          }
          card {
              title
              headline
              icon {
                  data {
                      attributes {
                          name
                          alternativeText
                          mime
                          url
                      }
                  }
              }
              content
              content_md
              image {
                  data {
                      attributes {
                          name
                          alternativeText
                          mime
                          url
                      }
                  }
              }
              cta_text
              cta_url
              cta_modal
              cta_page {
                  data {
                      attributes {
                          title
                          slug
                      }
                  }
              }
              background_image {
                  data {
                      attributes {
                          name
                          alternativeText
                          url
                      }
                  }
              }
              background_color
          }
          background_file {
              data {
                  attributes {
                      name
                      alternativeText
                      mime
                      url
                  }
              }
          }
          background_color
      }
      ... on ComponentBlocksHomeIntro {
          collection
          title
          content
          hunters {
              name
              image {
                  data {
                      attributes {
                          name
                          alternativeText
                          mime
                          url
                      }
                  }
              }
              job_title
          }
          highlights {
              text
              background_color
          }
      }
        ... on ComponentBlocksMultiCardSection {
            collection
            title
            headline
            content
            content_md
            cta_text
            cta_url
            cta_modal_multi: cta_modal
            cta_page {
                data {
                    attributes {
                        title
                        slug
                    }
                }
            }
            cards {
                title
                headline
                icon {
                    data {
                        attributes {
                            name
                            alternativeText
                            mime
                            url
                        }
                    }
                }
                content
                content_md
                image {
                    data {
                        attributes {
                            name
                            alternativeText
                            mime
                            url
                        }
                    }
                }
                cta_text
                cta_url
                cta_page {
                    data {
                        attributes {
                            title
                            slug
                        }
                    }
                }
                background_image {
                    data {
                        attributes {
                            name
                            alternativeText
                            url
                        }
                    }
                }
                background_color
            }
            background_file {
                data {
                    attributes {
                        name
                        alternativeText
                        mime
                        url
                    }
                }
            }
            background_color
        }
              ... on ComponentBlocksBenefitCards {
            title
            content
            benefit_sub_cards {
              title
              content_md
            }
          }

      ... on ComponentBlocksHomeTestimonial {
          collection
          col_headers
          testimonials {
              name
              position
              client {
                  data {
                      attributes {
                          company
                          logo {
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
                  }
              }
              content
          }
      }
      ... on ComponentBlocksIndustryLeadersSection {
          collection
          title
          clients {
              data {
                  attributes {
                      company
                      logo {
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
              }
          }
      }

... on ComponentBlocksWhyCyberWatch {
  heading
  description
  content
  side_image {
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


 ... on ComponentBlocksWhatCyberWatch {
            subHeading
            heading
            description
            content_md
            stats {
              value
              label
              description
            }
          }

      ... on ComponentBlocksMediaHighlight{
                    collection_media: collection
                    headline
                    title
                    author_name
                    publish_date
                    description
                    cta_text
                    cta_url
                    background_file {
                        data {
                        attributes {
                            name
                            alternativeText
                            mime
                            url
                        }
                        }
                    }
                    featured_image {
                        data {
                        attributes {
                            name
                            alternativeText
                            mime
                            url
                        }
                        }
                    }
                         featured_background {
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
        ... on ComponentBlocksPodcastInterview {
            collection_podcast: collection
            title
            headline
            content
            content_md
            background_file { data { attributes { url name alternativeText mime } } }
            featured_image  { data { attributes { url name alternativeText mime } } }
            episodes {
              title
              guest_name
              host_name
              platform
              publish_date
              duration
              url
              thumbnail { data { attributes { url name alternativeText mime } } }
              logo      { data { attributes { url name alternativeText mime } } }
            }
          }
            ... on ComponentBlocksKeyOutcomes {
  side_heading
  background_file {
    data {
      attributes {
        url
        alternativeText
      }
    }
  }

  outcome {
    title
    description
    icon {
    data {
      attributes {
        url
        alternativeText
      }
    }
  }
  }
}
... on ComponentBlocksCyberWatchDeliver {
  subHeading
  heading
  miniHeading
  CyberWatchpProvide {
    description
  }
}

    ... on ComponentBlocksSimuFeaturedMedia {
            sub_heading
            heading
            page_description
            background_file {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
            works {
              icon {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
              heading
              description
            }
          }
           ... on ComponentBlocksOffer {
            sub_heading
            heading
            page_description
            background_file {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
             featureImage {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
            bgUrlMob {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
            offering {
              icon {
              data {
                attributes {
                  url
                  name
                  alternativeText
                  mime
                }
              }
            }
              heading
              description
            }
          }


        ... on ComponentBlocksGlobalPressCoverage {
            collection_coverage: collection
            title
            headline
            content
            content_md
            background_file { data { attributes { url name alternativeText mime } } }
            featured_image  { data { attributes { url name alternativeText mime } } }
            coverage (pagination: { page: 1, pageSize: 50 }) {
              title
              guest_name
              host_name
              platform
              publish_date
              duration
              url
              thumbnail { data { attributes { url name alternativeText mime } } }
              logo      { data { attributes { url name alternativeText mime } } }
            }
          }
      ... on ComponentBlocksPackagesSection {
          collection
          title
          headline
          content
          features {
              data {
                  attributes {
                      title
                      items {
                          data {
                              attributes {
                                  title
                                  icon {
                                      data {
                                          attributes {
                                              name
                                              alternativeText
                                              mime
                                              url
                                          }
                                      }
                                  }
                                  description
                              }
                          }
                      }
                  }
              }
          }
          pricing_cards {
              title
              price
              duration
              content
              cta_text
              cta_url
              cta_modal_pricing: cta_modal
              icon {
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
          cta_text
          cta_url
          cta_page {
              data {
                  attributes {
                      title
                      slug
                  }
              }
          }
          table {
              data {
                  attributes {
                      name
                      title
                      columns {
                          data {
                              attributes {
                                  header
                                  rows {
                                      data {
                                          attributes {
                                              value
                                              tooltip
                                              has_tooltip
                                              image {
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
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      ... on ComponentBlocksCompanyWhoWeAre {
          collection
          title
          headline
          content
          tabs {
              title
              headline
              content
              image {
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
      }
      ... on ComponentBlocksCompanyCoreTeam {
          collection
          title
          headline
          content
          member_profiles {
              data {
                  attributes {
                      name
                      job_title
                      bio
                      social_links {
                          data {
                              attributes {
                                  url
                                  social {
                                      data {
                                          attributes {
                                              name
                                              locale
                                              icon {
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
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      ... on ComponentBlocksSingleCardSection {
          collection
          title
          headline
          content
          content_md
          cta_text
          cta_url
          cta_modal_single: cta_modal
          cta_page {
              data {
                  attributes {
                      title
                      slug
                  }
              }
          }
          card {
              title
              headline
              icon {
                  data {
                      attributes {
                          name
                          alternativeText
                          mime
                          url
                      }
                  }
              }
              content
              content_md
              image {
                  data {
                      attributes {
                          name
                          alternativeText
                          mime
                          url
                      }
                  }
              }
              cta_text
              cta_url
              cta_modal
              cta_page {
                  data {
                      attributes {
                          title
                          slug
                      }
                  }
              }
              background_image {
                  data {
                      attributes {
                          name
                          alternativeText
                          url
                      }
                  }
              }
              background_color
          }
          background_file {
              data {
                  attributes {
                      name
                      alternativeText
                      mime
                      url
                  }
              }
          }
          background_color
      }
      ... on ComponentBlocksSimpleSection {
        collection
        title
        headline
        content
        cta_text
        cta_url
        cta_page {
            data {
                attributes {
                    title
                    slug
                }
            }
        }
        background_file {
            data {
                attributes {
                    name
                    alternativeText
                    mime
                    url
                }
            }
        }
        background_color
    }
    ... on ComponentBlocksCmWhyEssential {
      collection
      title
      headline
      content
      statistics_cards {
          title
          percentage
          status
          number
          content
          icon {
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
    }
      ... on ComponentBlocksEventsSection {
      collection
      title
      description
      image {
        data {
            attributes {
                name
                alternativeText
                mime
                url
            }
        }
      }
      event_groups {
        title
        description
        image {
            data {
                attributes {
                    name
                    alternativeText
                    mime
                    url
                }
            }
        }
        events {
          title
          details
          image {
            data {
                attributes {
                    name
                    alternativeText
                    mime
                    url
                }
            }
          }
          location
          start_date
          end_date
          start_time
          end_time
          details_url
          type
        }
      }
    }
    ... on ComponentBlocksBhLevels {
      collection
      title
      headline
      content
      levels
      cards {
        title
        headline
        icon {
            data {
                attributes {
                    name
                    alternativeText
                    mime
                    url
                }
            }
        }
        content
        content_md
        image {
            data {
                attributes {
                    name
                    alternativeText
                    mime
                    url
                }
            }
        }
        cta_text
        cta_url
        cta_page {
            data {
                attributes {
                    title
                    slug
                }
            }
        }
        background_image {
            data {
                attributes {
                    name
                    alternativeText
                    url
                }
            }
        }
        background_color
      }
    }
  }
`;
