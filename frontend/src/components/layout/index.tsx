import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Nav from '../nav';
import Seo from '../seo';
import { useClassnames } from '../../hooks/use-classnames';

import style from './index.css';

const LINKS = [
    { text: 'О компании', link: '/#1', section: '#section1' },
    { text: 'Беспилотник', link: '/#2', section: '#section2' },
    { text: 'Карьера', link: '/#3', section: '#section3' }
];

const Layout = ({ children, seo, theme }) => {
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
                    <Nav setIsPopupVisible={setIsPopupVisible} theme={theme} links={LINKS} />
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
