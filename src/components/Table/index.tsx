import "./styles.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useRef, useState } from "react";
import { MenuItem, Pagination, Select, Skeleton, styled } from "@mui/material";
import {
  resetTableData,
  updateFilters,
  updateLimit,
  updatePage,
  updateSelectedRows,
  updateSortBy,
} from "@/redux/tableSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { DateRange } from "react-date-range";
import moment from "moment";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TiFilter } from "react-icons/ti";
import { GrClear } from "react-icons/gr";

export type TColumns = {
  label: string;
  field: string;
  width?: number;
  maxWidth?: number;
  textOverflow?: "nowrap" | "break-word";
  disableSearch?: boolean;
  disableSortBy?: boolean;
  renderComponent?: any;
  searchType?: "date" | "menu" | "text";
  menuOptions?: { label: string; value: string }[];
}[];

type TRows = {
  [key: string]: any;
};

type tableProps = {
  columns: TColumns;
  rows: TRows[];
  totalRecords?: number;
  checkboxSelection?: boolean;
  disableSearch?: boolean;
  disableSortBy?: boolean;
  cellPadding?: string;
  height?: number;
};

const limitOptions = [10, 20, 30, 40, 50];

function Table({
  columns = [],
  rows = [],
  totalRecords = 0,
  checkboxSelection = true,
  disableSearch = false,
  disableSortBy = false,
  cellPadding = "",
  height,
}: tableProps) {
  const { page, limit, isLoading, selectedRows, filters } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLTableSectionElement>(null);

  const totalPages = Math.ceil(totalRecords / limit);
  const startIndex = page * limit - limit + 1;
  const endIndex = page * limit;

  const [activeSearchField, setActiveSearchField] = useState<string>();
  const [activeSearchValue, setActiveSearchValue] = useState<string | null>();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);

  useOnClickOutside(ref, () => setActiveSearchField(""));

  useEffect(() => {
    dispatch(resetTableData());
  }, []);

  useEffect(() => {
    const sortByData = { sortOrder, sortField };

    if (sortField === null) {
      dispatch(updateSortBy({}));
    } else {
      dispatch(updateSortBy(sortByData));
    }
  }, [sortField, sortOrder]);

  function THead() {
    function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
      const isChecked = e.target.checked;

      if (isChecked) {
        dispatch(updateSelectedRows(rows));
      } else {
        dispatch(updateSelectedRows([]));
      }
    }

    function handleSortBy(value: string) {
      setSortField(value);

      if (sortOrder === null || sortField !== value) {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder(null);
        setSortField(null);
      }
    }

    function RenderSortByIcon({ onClick, value }: { onClick: () => void; value: string }) {
      return sortOrder === "desc" && sortField === value ? (
        <HiArrowDown
          className="sort-icon"
          title="Unsort"
          onClick={onClick}
          style={{ visibility: "visible" }}
        />
      ) : sortOrder === null || sortField !== value ? (
        <LuArrowUpDown
          className="sort-icon"
          onClick={onClick}
          title="Sort by Ascending Order"
          color="#AAAAAA"
        />
      ) : (
        <HiArrowUp
          className="sort-icon"
          color="#566D80"
          title="Sort by Descending Order"
          onClick={onClick}
          style={{ visibility: "visible" }}
        />
      );
    }

    function handleInputChange(name: string, value: string) {
      setActiveSearchValue(value);

      let updatedFilters;

      if (!value) {
        const { [name]: removed, ...rest } = filters;
        updatedFilters = rest;
      } else {
        updatedFilters = { ...filters, [name]: value };
      }

      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        dispatch(updatePage(1));
        dispatch(updateFilters(updatedFilters));
      }, 1000);

      setTimer(newTimer);
    }

    function handleSearch(name: string, value: string) {
      let updatedFilters;

      if (!value) {
        const { [name]: removed, ...rest } = filters;
        updatedFilters = rest;
      } else {
        updatedFilters = { ...filters, [name]: value };
      }

      dispatch(updatePage(1));
      dispatch(updateFilters(updatedFilters));
    }

    function handleDateChange(field: string, fromDate: string, toDate: string) {
      const dateRange = {
        [`${field}_from_date`]: fromDate,
        [`${field}_to_date`]: toDate,
      };

      dispatch(updateFilters({ ...filters, ...dateRange }));
      setActiveSearchField("");
    }

    function clearDateFilter(field: string) {
      const data = { ...filters };

      delete data?.[`${field}_from_date`];
      delete data?.[`${field}_to_date`];

      dispatch(updateFilters(data));
      setActiveSearchField("");
    }

    type columnSearchProps = {
      field: string;
      searchType?: string;
      menuOptions?: { label: string; value: string }[];
    };

    function ColumnSearch({ field, searchType, menuOptions = [] }: columnSearchProps) {
      function RenderSearchType() {
        switch (searchType) {
          case "date":
            return (
              <DateSearch
                fromDate={filters?.[`${field}_from_date`] as string}
                toDate={filters?.[`${field}_to_date`] as string}
                onChange={(fromDate, toDate) => handleDateChange(field, fromDate, toDate)}
                onClear={() => clearDateFilter(field)}
              />
            );
          case "menu":
            return (
              <SearchMenu
                options={menuOptions}
                value={filters?.[field]}
                onChange={(value) => {
                  handleSearch(field, value);
                  setActiveSearchField("");
                }}
              />
            );
          default:
            return (
              <div className="text-search">
                <input
                  autoFocus
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  value={activeSearchValue ?? filters?.[field]}
                  placeholder="search..."
                />
                <IoCloseOutline
                  className="close-icon"
                  onClick={() => {
                    handleSearch(field, "");
                    setActiveSearchValue("");
                  }}
                />
              </div>
            );
        }
      }

      return (
        <div className="table__cell-search-container">
          <RenderSearchType />
        </div>
      );
    }

    return (
      <thead ref={ref}>
        <tr>
          {/* checkbox select all */}
          {rows.length !== 0 && checkboxSelection && (
            <th style={{ padding: cellPadding }}>
              <input
                type="checkbox"
                checked={rows?.length === selectedRows?.length}
                onChange={handleSelectAll}
              />
            </th>
          )}

          {/* Mapping columns data */}
          {columns?.map((column, index) => (
            <th key={index} style={{ padding: cellPadding }}>
              <div className="table__cell-title-container">
                {/* column title */}
                <div
                  className="title"
                  style={{
                    cursor: !disableSearch && !column?.disableSearch ? "pointer" : "default",
                    color: Object.keys(filters).some(
                      (key) => key === column?.field || key.includes(column?.field),
                    )
                      ? "#5046E5"
                      : "",
                  }}
                  onClick={() => {
                    if (!disableSearch && !column?.disableSearch) {
                      setActiveSearchField(column?.field);
                      setActiveSearchValue(null);
                    }
                  }}
                >
                  {column?.label}
                  {!disableSearch && !column?.disableSearch && <IoIosArrowDown />}
                </div>

                {/* sort by */}
                {rows?.length !== 0 && !disableSortBy && !column?.disableSortBy && (
                  <RenderSortByIcon
                    onClick={() => handleSortBy(column?.field)}
                    value={column?.field}
                  />
                )}

                {/* search */}
                {activeSearchField === column?.field && (
                  <ColumnSearch
                    field={column?.field}
                    searchType={column?.searchType}
                    menuOptions={column?.menuOptions}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  function TBody() {
    function handleRowsSelection(value: TRows) {
      const existingItem = selectedRows?.some((item) => item?.id === value?.id);

      if (existingItem) {
        const updatedRows = selectedRows?.filter((item) => item?.id !== value?.id);
        dispatch(updateSelectedRows(updatedRows));
      } else {
        dispatch(updateSelectedRows([...selectedRows, value]));
      }
    }

    return (
      <tbody>
        {rows?.map((row, index) => (
          <tr key={index}>
            {checkboxSelection && (
              <td style={{ padding: cellPadding }}>
                <input
                  type="checkbox"
                  checked={selectedRows?.some((item) => item?.id === row?.id)}
                  onChange={() => handleRowsSelection(row)}
                />
              </td>
            )}

            {columns?.map((column, columnIndex) => (
              <td
                key={columnIndex}
                style={{
                  padding: cellPadding,
                  maxWidth: column?.maxWidth,
                  ...(column?.width && { minWidth: column?.width, maxWidth: column?.width }),
                  ...(column?.textOverflow === "break-word" && {
                    whiteSpace: "initial",
                    overflowWrap: "break-word",
                  }),
                }}
              >
                {typeof row?.[column?.field] !== "object"
                  ? row?.[column?.field]
                  : column?.renderComponent && (
                      <column.renderComponent {...(row?.[column?.field] as object)} />
                    )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  function TableLoading() {
    const staticRows = Array(8).fill("");

    return (
      <tbody>
        {staticRows.map((_, i) => (
          <tr key={i}>
            {columns.map((_, index) => (
              <td key={index}>
                <Skeleton variant="text" sx={{ fontSize: "0.85rem" }} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="table-container" style={{ height: height ? `${height}vh` : "" }}>
      {/* <DateSearch /> */}
      <div className="table" style={{ height: totalRecords === 0 ? "100%" : "" }}>
        <table>
          <THead />

          {isLoading ? (
            <TableLoading />
          ) : rows.length !== 0 ? (
            <TBody />
          ) : (
            <h2 className="table__no-data">No Data Available!</h2>
          )}
        </table>
      </div>

      {/* pagination */}
      {totalRecords !== 0 && rows.length !== 0 && (
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            shape="rounded"
            size="small"
            onChange={(_, value) => dispatch(updatePage(value))}
            page={page}
          />

          <div className="right-section">
            <p>
              Results: {startIndex} - {endIndex > totalRecords ? totalRecords : endIndex} of{" "}
              {totalRecords}
            </p>

            <CustomSelect
              value={limit}
              onChange={(e) => {
                dispatch(updatePage(1));
                dispatch(updateLimit(e.target.value));
              }}
            >
              {limitOptions?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomSelect>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;

const CustomSelect = styled(Select)({
  border: "2px solid #eee",
  borderRadius: 5,
  backgroundColor: "#fff",

  fieldset: {
    border: "none",
  },

  ".MuiInputBase-input": {
    padding: "5px 8px",
  },
});

type menuProps = {
  options: { label: string; value: string }[] | [];
  value: string | number;
  onChange: (value: string) => void;
};

function SearchMenu({ options, value, onChange }: menuProps) {
  return (
    <div className="search-menu">
      {options?.length !== 0 ? (
        options?.map((item, index) => (
          <p
            key={index}
            className={`menu-item ${value === item.value ? "active" : ""}`}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </p>
        ))
      ) : (
        <p className="menu-item">No Options</p>
      )}
    </div>
  );
}

type dateSearchProps = {
  fromDate: string;
  toDate: string;
  onChange: (fromDate: string, toDate: string) => void;
  onClear: () => void;
};

function DateSearch({
  fromDate,
  toDate,
  onChange = () => null,
  onClear = () => null,
}: dateSearchProps) {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setState([
      {
        startDate: moment(fromDate).toDate(),
        endDate: moment(toDate).toDate(),
        key: "selection",
      },
    ]);
  }, [fromDate, toDate]);

  return (
    <div className="date-search-container">
      <DateRange
        startDatePlaceholder="From Date"
        endDatePlaceholder="To Date"
        rangeColors={["#052d93"]}
        maxDate={new Date()}
        moveRangeOnFirstSelection={false}
        ranges={state}
        onChange={(data) => setState([data.selection])}
      />

      <div className="actions-container">
        <p
          onClick={() =>
            onChange(
              moment(state[0].startDate).format("YYYY-MM-DD"),
              moment(state[0].endDate).format("YYYY-MM-DD"),
            )
          }
        >
          <TiFilter size={18} />
          Filter
        </p>
        <p
          onClick={() => {
            setState([
              {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
              },
            ]),
              onClear();
          }}
        >
          <GrClear />
          Clear
        </p>
      </div>
    </div>
  );
}
