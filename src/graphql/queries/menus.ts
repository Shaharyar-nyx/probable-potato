import { gql } from "@apollo/client";

export const GET_MAIN_NAV = gql`
  query Header {
    header {
      data {
        attributes {
          company_logo {
            data {
              attributes {
                name
                alternativeText
                mime
                url
              }
            }
          }
          navigations {
            data {
              attributes {
                title
                key
                items {
                  data {
                    attributes {
                      title
                      description
                      has_children
                      url
                      icon {
                        data {
                          attributes {
                            name
                            alternativeText
                            url
                          }
                        }
                      }
                      page {
                        data {
                          attributes {
                            title
                            slug
                          }
                        }
                      }
                      children {
                        data {
                          attributes {
                            title
                            description
                            has_children
                            children {
                              data {
                                attributes {
                                  title
                                  description
                                  has_children
                                  url
                                  name
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
                            url
                            name
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
          supported_languages {
            data {
              attributes {
                name
                code
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
          button_group {
            id
            title
            external_href
            href
            transparent
            variant
          }
        }
      }
    }
  }
`;

export const GET_FOOTER_NAV = gql`
  query Footer {
    footer {
      data {
        attributes {
          company_logo {
            data {
              attributes {
                name
                alternativeText
                mime
                url
              }
            }
          }
          navigations {
            data {
              attributes {
                title
                key
                items {
                  data {
                    attributes {
                      title
                      description
                      has_children
                      url
                      icon {
                        data {
                          attributes {
                            name
                            alternativeText
                            url
                          }
                        }
                      }
                      page {
                        data {
                          attributes {
                            title
                            slug
                          }
                        }
                      }
                      children {
                        data {
                          attributes {
                            title
                            description
                            has_children
                            url
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
                            page {
                              data {
                                attributes {
                                  title
                                  slug
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
          company_socials {
            data {
              attributes {
                name
                url
                social {
                  data {
                    attributes {
                      name
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
      }
    }
  }
`;
