// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Page from '../components/Page';
import ContactForm from '../components/ContactForm';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const ContactTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Navigation isIndex />

      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
        <ContactForm />
      </Page>

    </Layout>
  );
};

export const query = graphql`
  query ContactTemplate {
    markdownRemark(fields: {slug: {eq: "templates/contact"}}) {
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

export default ContactTemplate;
