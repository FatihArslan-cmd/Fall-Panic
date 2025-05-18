export const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return {
        background: '#E6F7ED',
        text: '#2E7D32'
      };
    case 'medium':
      return {
        background: '#FFF8E1',
        text: '#F57F17'
      };
    case 'hard':
      return {
        background: '#FFEBEE',
        text: '#C62828'
      };
    default:
      return {
        background: '#E8EAF6',
        text: '#3F51B5'
      };
  }
};