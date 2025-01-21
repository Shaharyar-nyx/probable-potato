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
    ... on ComponentBlocksSingleCardSection {
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
}
`;
