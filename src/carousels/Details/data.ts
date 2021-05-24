import faker from 'faker';
import niceColors from 'nice-color-palettes';
faker.seed(1);

const colors = [
    ...niceColors[1].slice(1, niceColors[1].length),
    ...niceColors[5].slice(1, 3),
];

const data = [
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435053.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/435/435061.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435064.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435038.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435028.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435047.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435020.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435027.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/435/435035.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/1355/1355979.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/2701/2701705.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/128/2701/2701724.png',
    },
    {
        image: 'https://image.flaticon.com/icons/png/512/2851/2851782.png',
    },
];


export const detailsIcons = [
    { color: '#9FD7F1', icon:'isv'},
    { color: '#F3B000', icon:'key'},
    { color: '#F2988F', icon:'edit'},
] 
export interface CardProps{
    key: string;
    color: string;
    name: string;
    jobTitle: string;
    categories: {
        key: string;
        title: string;
        subCats: string[];
    }[];
    image: string;
};
export default data.map((item, index) => {
    const nOfCategoryItems = Math.floor(Math.random() * 10)+1;
    const nOfSubCats = Math.floor(Math.random() * 10)+1;
    return ({
        ...item,
        key: faker.datatype.uuid(),
        color: colors[index % colors.length],
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        categories: [...Array(nOfCategoryItems).keys()].map(() => {
            return ({
                key: faker.datatype.uuid(),
                title: faker.name.jobType(),
                subCats:[...Array(nOfSubCats).keys()].map(faker.name.jobType)
        
            })
        })
    })
})