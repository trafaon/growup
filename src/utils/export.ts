import { GrowData } from '../types/grow';
import { formatDate } from './dates';

export const generatePdfContent = (data: Partial<GrowData>): string => {
  const sections = [
    {
      title: 'Goal',
      content: `
Objective: ${data.goal?.objective || ''}
Success Indicators: ${data.goal?.successIndicators || ''}
      `
    },
    {
      title: 'Current Reality',
      content: `
Situation: ${data.reality?.currentSituation || ''}
Challenges:
${data.reality?.challenges.map(c => `- ${c}`).join('\n') || ''}
      `
    },
    {
      title: 'Selected Options',
      content: data.options
        ?.filter(opt => data.wayForward?.selectedOptions.includes(opt.id))
        .map(opt => `
Option: ${opt.description}
Pros:
${opt.pros.map(p => `- ${p}`).join('\n')}
Cons:
${opt.cons.map(c => `- ${c}`).join('\n')}
        `).join('\n') || ''
    },
    {
      title: 'Action Plan',
      content: data.wayForward?.actionItems.map(item => `
Task: ${item.description}
Due: ${formatDate(item.dueDate)}
Status: ${item.status}
      `).join('\n') || ''
    },
    {
      title: 'Commitment',
      content: data.wayForward?.commitment || ''
    }
  ];

  return sections.map(section => `
# ${section.title}
${section.content.trim()}
  `).join('\n\n');
};