// Centralized theme configuration for consistent styling across all pages

export const theme = {
  // Colors
  colors: {
    primary: '#db4f43', // Main brand color
    primaryHover: '#c73d37', // Darker shade for hover states
    secondary: '#f4f0e3', // Background color
    accent: '#f6d2c0', // Light accent color
    text: {
      primary: '#171717', // Main text color
      secondary: '#6b7280', // Secondary text color
      muted: '#9ca3af', // Muted text color
    },
    status: {
      success: '#10b981', // Green for success states
      warning: '#f59e0b', // Yellow for warning states
      error: '#ef4444', // Red for error states
      info: '#3b82f6', // Blue for info states
    }
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'var(--font-source-sans)',
      serif: 'var(--font-playfair)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },

  // Spacing
  spacing: {
    container: 'max-w-4xl mx-auto px-4',
    section: 'py-8',
    card: 'p-6',
  },

  // Components
  components: {
    page: {
              wrapper: 'min-h-screen bg-transparent',
      container: 'max-w-4xl mx-auto px-4 py-8',
      title: 'text-3xl font-bold text-gray-900 mb-8',
    },
    card: {
      wrapper: 'bg-white rounded-lg shadow-md',
      header: 'text-xl font-semibold text-gray-900 mb-4',
      content: 'p-6',
    },
    button: {
      primary: 'bg-[#db4f43] text-white px-6 py-3 rounded-lg hover:bg-[#c73d37] transition-colors',
      secondary: 'border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors',
      danger: 'bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors',
    },
    status: {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    }
  },

  // Layout
  layout: {
          pageWrapper: 'min-h-screen bg-transparent',
    pageContainer: 'max-w-4xl mx-auto px-4 py-8',
    sectionSpacing: 'space-y-8',
    cardSpacing: 'space-y-6',
  }
};

// Helper functions for consistent styling
export const getPageClasses = () => ({
  wrapper: theme.layout.pageWrapper,
  container: theme.layout.pageContainer,
  title: theme.components.page.title,
});

export const getCardClasses = () => ({
  wrapper: theme.components.card.wrapper,
  header: theme.components.card.header,
  content: theme.components.card.content,
});

export const getButtonClasses = () => ({
  primary: theme.components.button.primary,
  secondary: theme.components.button.secondary,
  danger: theme.components.button.danger,
});

export const getStatusClasses = () => ({
  success: theme.components.status.success,
  warning: theme.components.status.warning,
  error: theme.components.status.error,
  info: theme.components.status.info,
});