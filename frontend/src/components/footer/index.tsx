import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import privacyPolicyDocLink from '../../../static/docs/Политика_в_области_обработки_и_защиты_персональных_данных_0_5.pdf';
import accreditationDocLink from '../../../static/docs/Аккредитация МинКомСвязь.pdf';

import { useClassnames } from '../../hooks/use-classnames';
import { gtagClicked } from '../../utils';
import { appContext } from '../../context/context';

import Button from '../button-like/button';
import Heading from '../heading';
import GridWrapper from '../grid-wrapper';
import Text from '../text';

import styles from './index.css';

const query = graphql`
  query {
    allStrapiFooter {
      edges {
        node {
          header
          disclaimer
          modalLinkText
          copyright
          coreBusiness
          accreditationText
          accreditationIsLink
          privacyPolicyText
          privacyPolicyIsLink
        }
      }
    },
  }
`;

const Footer = ({ className }: {className?: string}) => {
    const cn = useClassnames(styles);
    const data = useStaticQuery(query);
    const { setIsContactFormVisible } = useContext(appContext);
    const { header, disclaimer, modalLinkText, copyright, coreBusiness, accreditationText, accreditationIsLink, privacyPolicyText, privacyPolicyIsLink } = data.allStrapiFooter.edges[0].node;

    const handleClick = () => {
        gtagClicked('footer_button_click');
        setIsContactFormVisible?.(true);
    };

    return (
        <GridWrapper as="footer" className={cn('main-footer', className)}>
            <Heading className={cn('main-footer__header')} level={2}>
                {header}
            </Heading>

            <Button
                className={cn('main-footer__button')}
                buttonSize="s"
                onClick={handleClick}
            >
                {modalLinkText}
            </Button>

            <Text
                className={cn('main-footer__disclaimer')}
                as="p"
                size={5}
                dangerouslySetInnerHTML={{ __html: disclaimer }}
            />

            <Text className={cn('main-footer__copyright')} as="span" size={5}>{copyright}</Text>

            <Text className={cn('main-footer__legal-info')} size={5}>
                <span className={cn('main-footer__core-business')}>
                    {coreBusiness}
                </span>

                {
                    accreditationText && (
                        accreditationIsLink
                            ? (
                                <a
                                    className={cn('main-footer__accreditation')}
                                    href={accreditationDocLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {accreditationText}
                                </a>
                            )

                            : <span className={cn('main-footer__accreditation')}>{accreditationText}</span>
                    )
                }

                {
                    privacyPolicyText && (
                        privacyPolicyIsLink
                            ? (
                                <a
                                    className={cn('main-footer__privacy-policy')}
                                    href={privacyPolicyDocLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {privacyPolicyText}
                                </a>
                            )
                            : <span className={cn('main-footer__privacy-policy')}>{privacyPolicyText}</span>
                    )
                }
            </Text>

        </GridWrapper>
    );
};

export default Footer;
