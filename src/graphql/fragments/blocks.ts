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
