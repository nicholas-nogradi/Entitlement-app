import EntitlementDetail from './EntitlementDetail.jsx';
import entitlement from '../../stub/entitlements.js';

const meta = {
    title: 'Components/EntitlementDetail',
    component: EntitlementDetail,
}

export default meta

export const Default = {
    args: {
        entitlement: entitlement[1],
    }
}