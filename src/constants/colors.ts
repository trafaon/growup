export const GROW_COLORS = {
  goal: {
    bg: 'bg-green-500',
    hoverBg: 'hover:bg-green-600',
    text: 'text-green-600',
    lightBg: 'bg-green-50'
  },
  reality: {
    bg: 'bg-blue-500',
    hoverBg: 'hover:bg-blue-600',
    text: 'text-blue-600',
    lightBg: 'bg-blue-50'
  },
  options: {
    bg: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600',
    text: 'text-yellow-600',
    lightBg: 'bg-yellow-50'
  },
  wayForward: {
    bg: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-600',
    text: 'text-orange-600',
    lightBg: 'bg-orange-50'
  },
  summary: {
    bg: 'bg-purple-500',
    hoverBg: 'hover:bg-purple-600',
    text: 'text-purple-600',
    lightBg: 'bg-purple-50'
  }
} as const;

export const STATUS_COLORS = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800'
  },
  'in-progress': {
    bg: 'bg-blue-100',
    text: 'text-blue-800'
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-800'
  }
} as const;