import { getUniqueArray } from "../../utils/functions";

const FilterByCategory = (props) => {
    const { newsData, onSourceCategoryFilter } = props;
    const catData = getUniqueArray(newsData, 'category')

    return (
        catData.length > 0 ?
            <div className="filterWrap_item">
                {/* <p className="filterWrap_item_heading">By Category</p> */}
                <select onChange={(e) => onSourceCategoryFilter(e,'category')} className="filterWrap_item_selectbox">
                    <option value={''} index={'categoryNull'}>Select Category</option>
                    {catData.map((data, index) => {
                        if (data.category) {
                            return (
                                <option value={data.category} key={`category_${data.category}_${index}`}>{data.category}</option>
                            )
                        }
                    })
                    }
                </select>
            </div>
            : ''
    )
}

export default FilterByCategory;
