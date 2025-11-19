import EntitlementGrid from "./EntitlementGrid.jsx";
import entitlements from "../../stub/entitlements.js";

const meta = {
    title: 'Components/EntitlementGrid',
    component: EntitlementGrid,
}

export default meta

export const Default = {
    args: {
        entitlements: {
            data: entitlements,
            total: entitlements.length,
            count: entitlements.length,
            limit: 20,
            offset: 0,
        },
        pagination: {},
    }
}

export const NoResults = {
    args: {
        entitlements: {
            data: [],
            total: 0,
            count: 0,
            limit: 20,
            offset: 0,
        },
        pagination: {},
    }
}