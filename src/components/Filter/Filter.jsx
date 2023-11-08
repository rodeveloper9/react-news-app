import FilterByDate from './FilterByDate'
import FilterByCategory from './FilterByCategory'
import FilterBySource from './FilterBySource'
import "./styles/_filter.scss";

const Filter = (props) => {
    const {newsData, dateValue, onCalenderChange, onSourceCategoryFilter} = props;
    return (
        <div className='filterWrap'>
          <FilterByDate dateValue={dateValue} onCalenderChange={onCalenderChange}/>
          <FilterByCategory newsData={newsData} onSourceCategoryFilter={onSourceCategoryFilter} />
          <FilterBySource newsData={newsData} onSourceCategoryFilter={onSourceCategoryFilter} />
        </div>
    )
}

export default Filter