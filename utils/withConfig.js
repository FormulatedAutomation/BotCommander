import React from 'react';

const withConfig = (WrappedComponent) => {
  const wrapped = (props) => <WrappedComponent {...props} />;
  wrapped.getStaticProps = async (...args) => {
    // fetch the config endpoint to make sure its good
    return WrappedComponent.getInitialProps(...args)
  };
  return wrapped;
}

export default withConfig;
