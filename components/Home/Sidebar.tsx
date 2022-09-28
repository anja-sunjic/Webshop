import { useEffect, useMemo, useState } from "react";

import { CartItemType } from "../../types";
import { WorkshopDataSidebar } from "../../interfaces";
import fetchData from "../../helpers/api";

const Sidebar = ({ data, setData }: WorkshopDataSidebar) => {
  const [selected, setSelected] = useState<string>('all');
  const [categories, setCategories] = useState<Array<string>>([]);

  useEffect(() => {
    const categories = fetchData('categories');
    categories.then((cats: Array<string>) => {
      setCategories(cats)
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const newData = fetchData('workshops');
    newData.then((d: Array<CartItemType>) => {setData({
      ...data,
      content: selected !== 'all' ? d.filter((item: any) => item.category === selected) : d
    })})
    .catch(console.warn)
  }, [ selected ]);

  function getSelectedClass(category: string): string {
    if (category === selected) return 'selected';
    return '';
  }

  return (
    <div className={`sidebar home`}>
      <div className="inner">
        <div className="columns is-gapless mb-0">
          <div className="column is-1"></div>
          <div className="column">
            <p className="small">Filter by category:</p>
          </div>
        </div>

        <div className="filters-list">
          <div
            className={"filter-single " + getSelectedClass('all')}
            onClick={async () => {
              setSelected('all');
            }}>
            <div className="columns is-gapless">
              <div className="column is-1"></div>
              <div className="column">
                <p>All</p>
              </div>
            </div>
          </div>
          {categories.map((item, index) => {
            return (
              <div
                className={"filter-single " + getSelectedClass(item)}
                key={"category_" + index}
                onClick={async () => {
                  setSelected(item);
                }}
              >
                <div className="columns is-gapless">
                  <div className="column is-1">
                    <div className="left">
                      <img src={`/icons/${item}.svg`} alt="" />
                    </div>
                  </div>
                  <div className="column">
                    <p>{item}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
