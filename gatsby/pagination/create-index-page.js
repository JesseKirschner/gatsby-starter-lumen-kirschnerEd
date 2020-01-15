'use strict';

const path = require('path');
const _ = require('lodash');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const { entryPage } = siteConfig;

  if (entryPage) {
    const indexPageResult = await graphql(`
    {
      file(name: {eq: "welkom"}) {
        childMarkdownRemark {
          frontmatter {
            template
          }
          fields {
            slug
          }
        }
      }
    }`);

    const indexPage = indexPageResult.data.file.childMarkdownRemark;

    createPage({
      path: '/',
      component: path.resolve('./src/templates/index-template.js'),
      context: { slug: indexPage.fields.slug }
    });
  } else {
    throw Error('entryPage not defined in config');
  }
};
