export const getActivityBreadcrumbs = (activity) => [
  {
    text: 'Activity',
    url: '/?page=1&type=activity'
  },
  {
    text: activity?.name,
    url: `/activities/${activity?.uuid}`
  }
]

const THEMES = [
  'Beach',
  'Biking',
  'Camping',
  'Cruise',
  'Culinary',
  'Culture',
  'Diving/Snorkelling',
  'Family',
  'Golf',
  'Hiking',
  'Outdoor/Adventure',
  'Photography',
  'Romance/Honeymoon',
  'Sightseeing',
  'Trekking',
  'Wellness',
  'Wildlife / Nature',
  'Winter'
]

export const getThemes = () =>
  THEMES.map((theme) => ({
    value: theme,
    label: theme
  }))
