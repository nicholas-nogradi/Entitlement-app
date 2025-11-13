import EntitlementCard from './EntitlementCard.jsx';
import entitlement from '../stub/entitlements.js';
import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    skeletonBase: '#f0f0f0',
    skeletonHighlight: '#e0e0e0',
  }
};

const meta = {
    title: 'Components/EntitlementCard',
    component: EntitlementCard,
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <Story />
            </ThemeProvider>
        )
    ]
}

export default meta

export const Default = {
    args: {
        entitlement: entitlement[2],
    }
}

export const Empty = {
    args: {
        entitlement: entitlement[3],
    }
}

export const Loading = {
    args: {
        isLoading: true,
    }
}

