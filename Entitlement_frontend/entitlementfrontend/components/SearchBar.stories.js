import SearchBar from "./SearchBar";

const meta = {
    title: 'Components/SearchBar',
    component: SearchBar,
}

export default meta

export const Default = {
    args: {
        onSearch: (term, status) => {
            console.log('Search term:', term, 'Status filter:', status);
        }
    }
}