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
    const { header, link, disclaimer } = data.allStrapiFooter.edges[0].node;

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
                    <Link className={cn('footer__documents-link')} to="https://sberautotech-site-bucket.obs.ru-moscow-1.hc.sbercloud.ru/group-structure.pdf">Правовая информация</Link>
                </div>
                <div className={cn('footer__bottom-block_right')}>
                    <span className={cn('footer__disclaimer')}>{disclaimer}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
