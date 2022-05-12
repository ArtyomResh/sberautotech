import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useClassnames } from '../../hooks/use-classnames';
import { gtagClicked } from '../../utils';
import Button from '../button';
import { appContext } from '../../context/context';

import style from './index.css';

const query = graphql`
  query {
    allStrapiFooter {
      edges {
        node {
          header
          description
          disclaimer
          privacyPolicyLink
          privacyPolicyText
          email
          link {
              text
              to
          }
        }
      }
    }
  }
`;

const Footer = () => {
    const cn = useClassnames(style);
    const data = useStaticQuery(query);
    const { setIsPopupVisible } = useContext(appContext);
    const { header, link, disclaimer, privacyPolicyLink, privacyPolicyText } = data.allStrapiFooter.edges[0].node;

    return (
        <footer className={cn('footer__wrapper')}>
            <div className={cn('footer__top-block')}>
                <div className={cn('footer__header')}>{header}</div>
                <Button
                    className={cn('footer__link')}
                    onClick={() => {
                        gtagClicked('footer_button_click');
                        setIsPopupVisible(true);
                    }}
                    label={link.text}
                />
            </div>
            <div className={cn('footer__bottom-block')}>
                <div className={cn('footer__bottom-block_left')}>
                    <Link className={cn('footer__documents-link')} to={privacyPolicyLink}>{privacyPolicyText}</Link>
                </div>
                <div className={cn('footer__bottom-block_right')}>
                    <span className={cn('footer__disclaimer')}>{disclaimer}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
