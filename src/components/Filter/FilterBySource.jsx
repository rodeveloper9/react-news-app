import { getUniqueArray } from "../../utils/functions";

const FilterBySource = (props) => {
    const { newsData, onSourceCategoryFilter } = props;
    const sources = ['News Org', 'The New York Times', 'The Guardian']

    return (
        newsData.length > 0 ?
            <div className="filterWrap_item">
                {/* <p className="filterWrap_item_heading">By Source</p> */}
                <select onChange={(e) => onSourceCategoryFilter(e, 'source')} className="filterWrap_item_selectbox">
                    <option value={''} key={'sourceNull'}>Select Source</option>
                    {sources.map((data, index) => {
                        if (data) {
                            return (
                                <option value={data} key={`source_${data}_${index}`}>{data}</option>
                            )
                        }
                    })
                    }
                </select>
            </div>
            : ''
    )
}

export default FilterBySource;
