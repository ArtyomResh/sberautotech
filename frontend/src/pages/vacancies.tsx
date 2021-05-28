import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Carousel from '../components/self-driving-cars-carousel';
import Footer from '../components/footer';
import VacanciesList from '../components/vacancies-list';

const query = graphql`
  query {
    strapiHomepage {
      seo {
        metaTitle
        metaDescription
      }
    }
    allStrapiCareer {
      edges {
        node {
          top_slider {
            header
            header_position
            slider_items {
                localFile {
                    publicURL
                }
            }
          }
          top_list {
            header
            list_items {
              id
              description
              header
              link {
                style
                text
                to
              }
              subDescriptionFirst
              subDescriptionSecond
              target
            }
          }
          bottom_slider {
            header
            header_position
            slider_items {
                localFile {
                    publicURL
                }
            }
          }
          bottom_list {
            header
            list_items {
              header
            }
          }
          footer {
            id
            description
            disclaimer
            header
            link {
              style
              text
              to
            }
            privacyPolicyLink
            publicOfferLink
            email
          }
        }
      }
    }
  }
`;

const vacanciesList = {
    vacancies_list: [{
        id        : 1,
        title     : 'Эксперт по подбору персонала на проект SberAutoTech',
        location  : 'Москва',
        type      : 'Полная занятость',
        created_at: '01.04.2021',
        author    : 'Управление персоналом ПАО Сбербанк',
        conditions: [
            'Работа в команде профессионалов',
            'Трудоустройство согласно ТК РФ',
            'Регулярное корпоративное обучение',
            'ДМС, страхование от несчастных случаев и тяжелых заболеваний',
            'Материальная помощь и социальная поддержка, корпоративная пенсионная программа',
            'Льготные условия кредитования',
            'Яркая и насыщенная корпоративная жизнь.'
        ],
        work_list: [
            'Уметь аккуратно собирать элементную базу компьютеров (материнские платы, оперативная память, процессоры и прочее), понимать логику подключения.',
            'Уметь разбираться в техдокументации к электронным компонентам на оборудование.',
            'Уметь читать чертежи, в том числе сборочные.',
            'Проводить тесты собранного оборудования, первичную настройку.'
        ],
        expect: [
            'Образование не ниже средне-специального.',
            'Опыт работы в области ремонта радиоэлектронных приборов, компьютеров и тп',
            'Знание схем и устройства бытовых и промышленных компьютеров.',
            'Аккуратность, скрупулёзность и усидчивость в работе.',
            'Навыки работы по инструкциям.',
            'Базовые знания электротехники приветствуются, опыт работы с мультиметром.',
            'Навык пайки очень приветствуется.',
            'Понимание физики теплоотвода от греющихся элементов, навык работы с системами жидкостного охлаждения будет большим плюсом.'
        ]
    }]
};

const Vacancies = () => {
    const data = useStaticQuery(query);
    const { top_slider, footer } = data.allStrapiCareer.edges[0].node;

    return (
        <Layout seo={data.strapiHomepage.seo} theme={{ mode: 'dark', logoColor: '#040A0A' }} pageNumber={2}>
            <div className="career__carousel">
                <Carousel data={top_slider} />
            </div>

            <VacanciesList data={vacanciesList} />

            <Footer data={footer} />
        </Layout>
    );
};

export default Vacancies;
