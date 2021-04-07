import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Nav from '../nav';
import Seo from '../seo';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const Layout = ({ children, seo }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const cn = useClassnames(style);
    return (
        <StaticQuery
            query={graphql`
      query {
        strapiHomepage {
          seo {
            metaTitle
            metaDescription
          }
        }
      }
    `}
            render={() => (
                <div className={cn('app__wrapper')}>
                    <Seo seo={seo} />
                    <Nav setIsPopupVisible={setIsPopupVisible} />
                    <main>{children}</main>
                    {isPopupVisible ? (
                      <React.Fragment>
                        POPUP!
                      </React.Fragment>
                    ) : null}
                </div>
            )}
        />
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
