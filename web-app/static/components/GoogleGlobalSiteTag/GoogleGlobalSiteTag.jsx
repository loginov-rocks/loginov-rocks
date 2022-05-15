import PropTypes from 'prop-types';
import * as React from 'react';

export const GoogleGlobalSiteTag = ({ trackingId }) => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "${trackingId}");
      `,
      }}
    />
  </>
);

GoogleGlobalSiteTag.propTypes = {
  trackingId: PropTypes.string.isRequired,
};
