// export type Filter = {
//   id: string
//   label: string
//   tags: string[]
// }

// export const FILTERS: Filter[] = [
//   {
//     id: 'type',
//     label: 'Type',
//     tags: ['All', 'Comic', 'Graphic Novel', 'Manga', 'Webtoon'],
//   },
//   {
//     id: 'genres',
//     label: 'Genres',
//     tags: [
//       'Adventure',
//       'Action',
//       'Comedy',
//       'Crime',
//       'Drama',
//       'Superhero',
//       'Sci-fi',
//       'Manga',
//       'Fantasy',
//       'History',
//       'Horror',
//       'Romance',
//       'Non-fiction',
//     ],
//   },
//   {
//     id: 'price',
//     label: 'Price',
//     tags: ['All', 'Paid', 'Free'],
//   },
//   {
//     id: 'category',
//     label: 'Category',
//     tags: ['Popular', 'Minting Live'],
//   },
//   {
//     id: 'status',
//     label: 'Status',
//     tags: ['Ongoing', 'Finished'],
//   },
//   {
//     id: 'audience',
//     label: 'Audience',
//     tags: ['All', '+7', '+12', '+16', '+18'],
//   },
// ]

export type Filter = {
  id: string
  label: string
  tags: string[]
}

export const FILTERS: Filter[] = [
  {
    id: 'type',
    label: 'Type',
    tags: ['Popular'],
  },
  {
    id: 'price',
    label: 'Price',
    tags: ['All', 'Paid', 'Free'],
  },
  {
    id: 'category',
    label: 'Category',
    tags: ['Popular', 'Minting Live'],
  },
  {
    id: 'status',
    label: 'Status',
    tags: ['Ongoing', 'Finished'],
  },
  {
    id: 'audience',
    label: 'Audience',
    tags: ['All', '+7', '+12', '+16', '+18'],
  },
]

export type Section = {
  slug: string
  name: string
  url: string
}

export const SECTIONS: Section[] = [
  {
    slug: 'comics',
    name: 'Comics',
    url: '/discover/comics',
  },
  {
    slug: 'issues',
    name: 'Episodes',
    url: '/discover/comic-issues',
  },
  {
    slug: 'creators',
    name: 'Creators',
    url: '/discover/creators',
  },
]
