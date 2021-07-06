import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { useClassnames } from '../../hooks/use-classnames';
import { gtagClicked } from '../../utils';

import style from './index.css';

interface IProps {
    data: {
        header: string,
        description: string,
        disclaimer: string,
        privacyPolicyLink: string,
        privacyPolicyText: string,
        email: string,
        link: {
            to: string,
            text: string
        }
    }
}

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

    const { header, link, disclaimer, privacyPolicyLink, privacyPolicyText, email } = data.allStrapiFooter.edges[0].node;

    return (
        <footer className={cn('footer__wrapper')}>
            <div className={cn('footer__top-block')}>
                <div className={cn('footer__header')}>{header}</div>
                <Link
                    to={link.to}
                    className={cn('footer__link')}
                    onClick={() => gtagClicked('footer_button_click')}
                >
                    {link.text}
                </Link>
            </div>
            <div className={cn('footer__bottom-block')}>
                <div className={cn('footer__bottom-block_left')}>
                    <span className={cn('footer__disclaimer')}>{disclaimer}</span>
                    <Link className={cn('footer__documents-link')} to={privacyPolicyLink}>{privacyPolicyText}</Link>
                </div>
                <div className={cn('footer__bottom-block_right')}>
                    <a className={cn('footer__email-link')} href={`mailto:${email}`}>{email}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
