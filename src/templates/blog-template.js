// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark, MarkdownRemark } from '../types';

type Props = {
  // data: AllMarkdownRemark,
  pageData: MarkdownRemark,
  pageContext: PageContext
};

const BlogTemplate = ({ data, pageData, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  // const {
  //   currentPage,
  //   hasNextPage,
  //   hasPrevPage,
  //   prevPagePath,
  //   nextPagePath
  // } = pageContext;


  // const { edges } = data.allMarkdownRemark;
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  // const blogTitle = currentPage > 0 ? `${pageTitle} - Pagina ${currentPage}` : pageTitle;
  const blogTitle = pageTitle;

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage}>
      <Sidebar isIndex />
      <Page title={blogTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
        {/* {currentPage === 0 ? <div dangerouslySetInnerHTML={{ __html: pageBody }} /> : ''} */}

        {/* <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        /> */}
      </Page>
    </Layout>
  );
};


// query BlogTemplate($postsLimit: Int!, $postsOffset: Int!) {
// allMarkdownRemark(
//   limit: $postsLimit,
//   skip: $postsOffset,
//   filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
//   sort: { order: DESC, fields: [frontmatter___date] }
// ){
// edges {
//   node {
//     fields {
//       slug
//       categorySlug
//     }
//     frontmatter {
//       title
//       date
//       category
//       description
//     }
//   }
// }
// }

export const query = graphql`
  query BlogTemplate {
    markdownRemark(fields: {slug: {eq: "templates/blog"}}) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default BlogTemplate;
